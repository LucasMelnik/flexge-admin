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

  componentWillMount() {
    if (this.props.params.distributorId) {
      StudentDetailService.handleLoadDistributor(this.props.params.distributorId);
    }
    if (this.props.params.companyId) {
      StudentDetailService.handleLoadCompany(this.props.params.companyId);
    }
    if (this.props.params.schoolId) {
      StudentDetailService.handleLoadSchool(this.props.params.schoolId);
    }
    if (this.props.params.schoolId && this.props.params.classId) {
      StudentDetailService.handleLoadClass(this.props.params.schoolId, this.props.params.classId);
    }
  }

  render() {
    return (
      <StudentFormScene
        studentId={this.props.params.studentId}
        company={StudentDetailService.company}
        distributor={StudentDetailService.distributor}
        school={StudentDetailService.school}
        class={StudentDetailService.class}
        fetching={
          StudentDetailService.fetchDistributor.fetching ||
          StudentDetailService.fetchCompany.fetching ||
          StudentDetailService.fetchSchool.fetching ||
          StudentDetailService.fetchClass.fetching
        }
      />
    );
  }
}

export default observer(StudentFormSceneContainer);
