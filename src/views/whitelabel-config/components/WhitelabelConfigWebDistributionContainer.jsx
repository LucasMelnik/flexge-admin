import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import WhitelabelConfigWebDistribution from './WhitelabelConfigWebDistribution';
import WhitelabelConfigWebDistributionService from '../services/WhitelabelConfigWebDistributionService';

class WhitelabelConfigWebDistributionContainer extends Component {
  static propTypes = {
    whitelabelConfigId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    WhitelabelConfigWebDistributionService.init(this.props.whitelabelConfigId);
  }

  render() {
    return (
      <WhitelabelConfigWebDistribution
        certificate={toJS(WhitelabelConfigWebDistributionService.certificate)}
        distributions={toJS(WhitelabelConfigWebDistributionService.distributions)}
        onCreateDistribution={WhitelabelConfigWebDistributionService.createDistribution}
        onDisableDistribution={WhitelabelConfigWebDistributionService.disableDistribution}
        fetching={
          WhitelabelConfigWebDistributionService.fetchCertificate.fetching ||
          WhitelabelConfigWebDistributionService.fetchDistribution.fetching
        }
      />
    );
  }
}

export default observer(WhitelabelConfigWebDistributionContainer);
