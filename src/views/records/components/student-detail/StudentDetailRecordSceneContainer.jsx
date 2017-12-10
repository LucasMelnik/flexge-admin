import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import StudentDetailService from '../../../student/services/StudentDetailService';
import StudentDetailRecordScene from './StudentDetailRecordScene';

class StudentDetailRecordSceneContainer extends Component {
  static propTypes = {
    params: PropTypes.shape({
      schoolId: PropTypes.string.isRequired,
      classId: PropTypes.string.isRequired,
      studentId: PropTypes.string.isRequired,
    }).isRequired,
  };

  studentDetailService = new StudentDetailService();

  componentWillMount() {
    this.studentDetailService.handleLoadSchool(this.props.params.schoolId);
    this.studentDetailService.handleLoadClass(
      this.props.params.schoolId,
      this.props.params.classId,
    );
    this.studentDetailService.handleLoadStudent(this.props.params.studentId);
  }

  render() {
    return (
      <StudentDetailRecordScene
        school={this.studentDetailService.school}
        class={this.studentDetailService.class}
        student={this.studentDetailService.student}
        schoolId={this.props.params.schoolId}
        classId={this.props.params.classId}
        studentId={this.props.params.studentId}
        fetching={
          this.studentDetailService.fetchSchool.fetching ||
          this.studentDetailService.fetchClass.fetching ||
          this.studentDetailService.fetchStudent.fetching
        }
      />
    );
  }
}

export default observer(StudentDetailRecordSceneContainer);
