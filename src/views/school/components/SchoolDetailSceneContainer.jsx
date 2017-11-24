import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import SchoolDetailScene from './SchoolDetailScene';
import SchoolDetailService from '../services/SchoolDetailService';

class SchoolDetailSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      schoolId: PropTypes.string.isRequired,
      companyId: PropTypes.string,
      distributorId: PropTypes.string,
    }).isRequired,
  };

  baseUrl = '';
  schoolDetailService = new SchoolDetailService();

  componentWillMount() {
    if (this.props.params.distributorId) {
      this.schoolDetailService.handleLoadDistributor(this.props.params.distributorId);
      this.baseUrl += `/distributors/${this.props.params.distributorId}`;
    }
    if (this.props.params.companyId) {
      this.schoolDetailService.handleLoadCompany(this.props.params.companyId);
      this.baseUrl += `/companies/${this.props.params.companyId}`;
    }
    this.schoolDetailService.handleLoadSchool(this.props.params.schoolId);
    this.baseUrl += `/schools/${this.props.params.schoolId}`;
  }

  render() {
    return (
      <SchoolDetailScene
        school={this.schoolDetailService.school}
        company={this.schoolDetailService.company}
        distributor={this.schoolDetailService.distributor}
        fetching={
          this.schoolDetailService.fetchSchool.fetching ||
          this.schoolDetailService.fetchCompany.fetching ||
          this.schoolDetailService.fetchDistributor.fetching
        }
        baseUrl={this.baseUrl}
      />
    );
  }
}

export default observer(SchoolDetailSceneContainer);
