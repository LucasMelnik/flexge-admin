import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import SchoolClassDetailScene from './SchoolClassDetailScene';
import SchoolClassDetailService from '../services/SchoolClassDetailService';

class SchoolClassDetailSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      schoolId: PropTypes.string,
      classId: PropTypes.string,
      companyId: PropTypes.string,
      distributorId: PropTypes.string,
    }).isRequired,
  };

  baseUrl = '';

  schoolClassDetailService = new SchoolClassDetailService();
  componentWillMount() {
    if (this.props.params.distributorId) {
      this.schoolClassDetailService.handleLoadDistributor(this.props.params.distributorId);
      this.baseUrl += `/distributors/${this.props.params.distributorId}`;
    }
    if (this.props.params.companyId) {
      this.schoolClassDetailService.handleLoadCompany(this.props.params.companyId);
      this.baseUrl += `/companies/${this.props.params.companyId}`;
    }
    if (this.props.params.schoolId) {
      this.schoolClassDetailService.handleLoadSchool(this.props.params.schoolId);
      this.baseUrl += `/schools/${this.props.params.schoolId}`;
    }

    if (localStorage.role === 'SCHOOL_MANAGER' || localStorage.role === 'TEACHER') {
      this.schoolClassDetailService.handleLoadSchool(localStorage.getItem('school'));
      this.schoolClassDetailService.handleLoadClass(localStorage.getItem('school'), this.props.params.classId);
    } else {
      this.schoolClassDetailService.handleLoadClass(this.props.params.schoolId, this.props.params.classId);
    }
    this.baseUrl += `/classes/${this.props.params.classId}`;
  }

  render() {
    return (
      <SchoolClassDetailScene
        baseUrl={this.baseUrl}
        // school={(localStorage.role === 'SCHOOL_MANAGER' || localStorage.role === 'TEACHER') ? this.getSchoolFromLocalStorage() : this.schoolClassDetailService.school}
        school={this.schoolClassDetailService.school}
        company={this.schoolClassDetailService.company}
        distributor={this.schoolClassDetailService.distributor}
        class={this.schoolClassDetailService.class}
        fetching={
          this.schoolClassDetailService.fetchDistributor.fetching ||
          this.schoolClassDetailService.fetchCompany.fetching ||
          this.schoolClassDetailService.fetchSchool.fetching ||
          this.schoolClassDetailService.fetchClass.fetching
        }
      />
    );
  }
}

export default observer(SchoolClassDetailSceneContainer);
