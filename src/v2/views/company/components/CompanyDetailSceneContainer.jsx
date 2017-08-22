import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CompanyDetailScene from './CompanyDetailScene';
import CompanyDetailService from '../services/CompanyDetailService';

class CompanyDetailSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      schoolId: PropTypes.string.isRequired,
      companyId: PropTypes.string,
      distributorId: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {

  };

  componentWillMount() {
    if (this.props.params.distributorId) {
      CompanyDetailService.handleLoadDistributor(this.props.params.distributorId);
    }
    CompanyDetailService.handleLoad(this.props.params.companyId);
  }

  render() {
    return (
      <CompanyDetailScene
        company={CompanyDetailService.company}
        companyId={this.props.params.companyId}
        distributor={CompanyDetailService.distributor}
        distributorId={this.props.params.distributorId}
      />
    );
  }
}

export default observer(CompanyDetailSceneContainer);
