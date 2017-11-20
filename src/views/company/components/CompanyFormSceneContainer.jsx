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

  componentWillMount() {
    if (this.props.params.distributorId) {
      CompanyDetailService.handleLoadDistributor(this.props.params.distributorId);
    }
  };

  render() {
    return (
      <CompanyFormScene
        companyId={this.props.params.companyId}
        distributorId={this.props.params.distributorId}
        distributor={CompanyDetailService.distributor}
      />
    );
  }
}

export default observer(CompanyFormSceneContainer);
