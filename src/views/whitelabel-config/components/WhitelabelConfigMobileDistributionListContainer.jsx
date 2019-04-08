import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import WhitelabelConfigMobileDistributionList from './WhitelabelConfigMobileDistributionList';
import WhitelabelConfigMobileDistributionListService from '../services/WhitelabelConfigMobileDistributionListService';
import WhitelabelConfigMobileDistributionFormService from '../services/WhitelabelConfigMobileDistributionFormService';

class WhitelabelConfigMobileDistributionListContainer extends Component {
  static propTypes = {
    whitelabelConfigId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    WhitelabelConfigMobileDistributionListService.init(this.props.whitelabelConfigId);
    WhitelabelConfigMobileDistributionFormService.init(this.props.whitelabelConfigId);
  }

  render() {
    return (
      <WhitelabelConfigMobileDistributionList
        distributions={toJS(WhitelabelConfigMobileDistributionListService.distributions)}
        fetching={
          WhitelabelConfigMobileDistributionListService.fetchDistribution.fetching ||
          WhitelabelConfigMobileDistributionFormService.fetch.fetching
        }
        onRemoveDistribution={WhitelabelConfigMobileDistributionListService.handleRemove}
        onUpdateDistribution={WhitelabelConfigMobileDistributionFormService.showForm}
      />
    );
  }
}

export default observer(WhitelabelConfigMobileDistributionListContainer);
