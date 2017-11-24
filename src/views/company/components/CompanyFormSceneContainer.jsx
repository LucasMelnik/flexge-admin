import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CompanyFormScene from './CompanyFormScene';
import CompanyDetailService from '../services/CompanyDetailService';

class CompanyFormSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      distributorId: PropTypes.string,
      companyId: PropTypes.string,
    }).isRequired,
  };

  companyDetailService = new CompanyDetailService();

  componentWillMount() {
    if (this.props.params.distributorId) {
      this.companyDetailService.handleLoadDistributor(this.props.params.distributorId);
    }
  };

  render() {
    return (
      <CompanyFormScene
        companyId={this.props.params.companyId}
        currentDistributor={this.props.params.distributorId}
        distributor={this.companyDetailService.distributor}
        fetching={this.companyDetailService.fetchDistributor.fetching}
      />
    );
  }
}

export default observer(CompanyFormSceneContainer);
