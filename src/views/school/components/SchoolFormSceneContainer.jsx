import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import SchoolFormScene from './SchoolFormScene';
import SchoolDetailService from '../services/SchoolDetailService';

class SchoolFormSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      schoolId: PropTypes.string,
      distributorId: PropTypes.string,
      companyId: PropTypes.string,
    }).isRequired,
  };

  schoolDetailService = new SchoolDetailService();

  componentWillMount() {
    if (this.props.params.distributorId) {
      this.schoolDetailService.handleLoadDistributor(this.props.params.distributorId);
    }

    if (this.props.params.companyId) {
      this.schoolDetailService.handleLoadCompany(this.props.params.companyId);
    }
  }

  render() {
    return (
      <SchoolFormScene
        schoolId={this.props.params.schoolId}
        currentCompany={this.props.params.companyId}
        company={this.schoolDetailService.company}
        distributor={this.schoolDetailService.distributor}
        fetching={
          this.schoolDetailService.fetchCompany.fetching ||
          this.schoolDetailService.fetchDistributor.fetching
        }
      />
    );
  }
}

export default observer(SchoolFormSceneContainer);
