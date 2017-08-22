import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import StudentFormScene from './StudentFormScene';
import StudentDetailService from '../services/StudentDetailService';
import StudentFormService from '../services/StudentFormService';

class StudentFormSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      schoolId: PropTypes.string,
      classId: PropTypes.string,
      companyId: PropTypes.string,
      distributorId: PropTypes.string,
      studentId: PropTypes.string,
    }).isRequired,
  }

  static defaultProps = {
    params: null,
  }

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
      StudentFormService.schoolId = this.props.params.schoolId;
      StudentFormService.classId = this.props.params.classId;
      StudentDetailService.handleLoadClass(this.props.params.schoolId, this.props.params.classId);
    }
  }

  render() {
    return (
      <StudentFormScene
        company={StudentDetailService.company}
        distributor={StudentDetailService.distributor}
        school={StudentDetailService.school}
        class={StudentDetailService.class}
        distributorId={this.props.params.distributorId}
        companyId={this.props.params.companyId}
        schoolId={this.props.params.schoolId}
        classId={this.props.params.classId}
        studentId={this.props.params.studentId}
      />
    );
  }
}

export default observer(StudentFormSceneContainer);
