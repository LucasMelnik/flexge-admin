import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CompanyDetailScene from './CompanyDetailScene';
import CompanyDetailService from '../services/CompanyDetailService';

class CompanyDetailSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      companyId: PropTypes.string.isRequired,
      distributorId: PropTypes.string,
    }).isRequired,
  };

  baseUrl = '';
  companyDetailService = new CompanyDetailService();

  componentWillMount() {
    if (this.props.params.distributorId) {
      this.companyDetailService.handleLoadDistributor(this.props.params.distributorId);
      this.baseUrl += `/distributors/${this.props.params.distributorId}`;
    }
    this.companyDetailService.handleLoad(this.props.params.companyId);
    this.baseUrl += `/companies/${this.props.params.companyId}`;
  }

  render() {
    return (
      <CompanyDetailScene
        company={this.companyDetailService.company}
        distributor={this.companyDetailService.distributor}
        fetching={
          this.companyDetailService.fetchDistributor.fetching ||
          this.companyDetailService.fetch.fetching
        }
        baseUrl={this.baseUrl}
      />
    );
  }
}

export default observer(CompanyDetailSceneContainer);
