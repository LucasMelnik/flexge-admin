import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import WhitelabelConfigDistribution from './WhitelabelConfigDistribution';
import WhitelabelConfigDistributionService from '../services/WhitelabelConfigDistributionService';

class WhitelabelConfigDistributionContainer extends Component {
  static propTypes = {
    whitelabelConfigId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    WhitelabelConfigDistributionService.init(this.props.whitelabelConfigId);
  }

  render() {
    return (
      <WhitelabelConfigDistribution
        certificate={toJS(WhitelabelConfigDistributionService.certificate)}
        distributions={toJS(WhitelabelConfigDistributionService.distributions)}
        onCreateDistribution={WhitelabelConfigDistributionService.createDistribution}
        onDisableDistribution={WhitelabelConfigDistributionService.disableDistribution}
        fetching={
          WhitelabelConfigDistributionService.fetchCertificate.fetching ||
          WhitelabelConfigDistributionService.fetchDistribution.fetching
        }
      />
    );
  }
}

export default observer(WhitelabelConfigDistributionContainer);
