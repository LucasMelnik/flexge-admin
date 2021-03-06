import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import SchoolClassFormScene from './SchoolClassFormScene';
import SchoolClassDetailService from '../services/SchoolClassDetailService';

class SchoolClassFormSceneContainer extends Component {
  static propTypes = {
    params: PropTypes.shape({
      schoolId: PropTypes.string,
      distributorId: PropTypes.string,
      companyId: PropTypes.string,
      classId: PropTypes.string,
    }).isRequired,
  };

  schoolClassDetailService = new SchoolClassDetailService();

  componentWillMount() {
    if (this.props.params.distributorId) {
      this.schoolClassDetailService.handleLoadDistributor(this.props.params.distributorId);
    }

    if (this.props.params.companyId) {
      this.schoolClassDetailService.handleLoadCompany(this.props.params.companyId);
    }

    if (this.props.params.schoolId) {
      this.schoolClassDetailService.handleLoadSchool(this.props.params.schoolId);
    }
    if (localStorage.role === 'SCHOOL_MANAGER' || localStorage.role === 'TEACHER') {
      this.schoolClassDetailService.handleLoadSchool(localStorage.getItem('school'));
    }
  }

  render() {
    return (
      <SchoolClassFormScene
        classId={this.props.params.classId}
        company={this.schoolClassDetailService.company}
        distributor={this.schoolClassDetailService.distributor}
        school={this.schoolClassDetailService.school}
        fetching={
          this.schoolClassDetailService.fetchDistributor.fetching ||
          this.schoolClassDetailService.fetchCompany.fetching ||
          this.schoolClassDetailService.fetchSchool.fetching
        }
      />
    );
  }
}

export default observer(SchoolClassFormSceneContainer);
