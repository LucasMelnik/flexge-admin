import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import StudentFormScene from './StudentFormScene';
import StudentDetailService from '../services/StudentDetailService';

class StudentFormSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      distributorId: PropTypes.string,
      companyId: PropTypes.string,
      schoolId: PropTypes.string,
      classId: PropTypes.string,
      studentId: PropTypes.string,
    }).isRequired,
  };

  studentDetailService = new StudentDetailService();
  componentWillMount() {
    if (this.props.params.distributorId) {
      this.studentDetailService.handleLoadDistributor(this.props.params.distributorId);
    }
    if (this.props.params.companyId) {
      this.studentDetailService.handleLoadCompany(this.props.params.companyId);
    }
    if (this.props.params.schoolId) {
      this.studentDetailService.handleLoadSchool(this.props.params.schoolId);
    }
    if (this.props.params.schoolId && this.props.params.classId) {
      this.studentDetailService.handleLoadClass(this.props.params.schoolId, this.props.params.classId);
    }
    if (localStorage.role === 'SCHOOL_MANAGER' || localStorage.role === 'TEACHER') {
      this.studentDetailService.handleLoadClass(this.getSchoolFromLocalStorage().id, this.props.params.classId);
    }
  }

  getSchoolFromLocalStorage = () => {
    const school = JSON.parse(localStorage.getItem('school'));
    school.id = school._id;
    return school;
  };

  render() {
    return (
      <StudentFormScene
        studentId={this.props.params.studentId}
        company={this.studentDetailService.company}
        distributor={this.studentDetailService.distributor}
        school={(localStorage.role === 'SCHOOL_MANAGER' || localStorage.role === 'TEACHER') ? this.getSchoolFromLocalStorage() : this.studentDetailService.school}
        class={this.studentDetailService.class}
        fetching={
          this.studentDetailService.fetchDistributor.fetching ||
          this.studentDetailService.fetchCompany.fetching ||
          this.studentDetailService.fetchSchool.fetching ||
          this.studentDetailService.fetchClass.fetching
        }
      />
    );
  }
}

export default observer(StudentFormSceneContainer);
