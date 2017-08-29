import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import StudentDetailScene from './StudentDetailScene';
import StudentDetailService from '../services/StudentDetailService';

class StudentDetailSceneContainer extends Component {

  static propTypes = {
    schoolId: PropTypes.string,
    classId: PropTypes.string,
    companyId: PropTypes.string,
    distributorId: PropTypes.string,
  }

  static defaultProps = {
    schoolId: null,
    classId: null,
    companyId: null,
    distributorId: null,
  }

  componentWillMount() {
    if (this.props.distributorId) {
      StudentDetailService.handleLoadDistributor(this.props.distributorId);
    }
    if (this.props.companyId) {
      StudentDetailService.handleLoadCompany(this.props.companyId);
    }
    if (this.props.schoolId) {
      StudentDetailService.handleLoadSchool(this.props.schoolId);
    }

    StudentDetailService.handleLoadClass(this.props.schoolId, this.props.classId);
  }

  render() {
    return (
      <StudentDetailScene
        school={StudentDetailService.school}
        company={StudentDetailService.company}
        distributor={StudentDetailService.distributor}
        class={StudentDetailService.class}
        schoolId={this.props.schoolId}
        classId={this.props.classId}
        companyId={this.props.companyId}
        distributorId={this.props.distributorId}
      />
    );
  }
}

export default observer(StudentDetailSceneContainer);
