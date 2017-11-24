import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import DistributorDetailScene from './DistributorDetailScene';
import DistributorDetailService from '../services/DistributorDetailService';

class DistributorFormContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      distributorId: PropTypes.string.isRequired,
    }).isRequired,
  };

  componentWillMount() {
    DistributorDetailService.handleLoad(this.props.params.distributorId);
  }

  render() {
    return (
      <DistributorDetailScene
        distributor={DistributorDetailService.distributor}
        fetching={DistributorDetailService.fetch.fetching}
      />
    );
  }
}

export default observer(DistributorFormContainer);
