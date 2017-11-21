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

  componentWillMount() {
    if (this.props.params.distributorId) {
      CompanyDetailService.handleLoadDistributor(this.props.params.distributorId);
      this.baseUrl += `/distributors/${this.props.params.distributorId}`;
    }
    CompanyDetailService.handleLoad(this.props.params.companyId);
    this.baseUrl += `/companies/${this.props.params.companyId}`;
  }

  render() {
    return (
      <CompanyDetailScene
        company={CompanyDetailService.company}
        distributor={CompanyDetailService.distributor}
        fetching={
          CompanyDetailService.fetchDistributor.fetching ||
          CompanyDetailService.fetch.fetching
        }
        baseUrl={this.baseUrl}
      />
    );
  }
}

export default observer(CompanyDetailSceneContainer);
