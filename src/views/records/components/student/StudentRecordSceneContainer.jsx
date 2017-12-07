import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import SchoolClassDetailService from '../../../school-class/services/SchoolClassDetailService';
import StudentRecordScene from './StudentRecordScene';

class StudentRecordSceneContainer extends Component {
  static propTypes = {
    params: PropTypes.shape({
      schoolId: PropTypes.string.isRequired,
      classId: PropTypes.string.isRequired,
    }).isRequired,
  };

  schoolClassDetailService = new SchoolClassDetailService();

  componentWillMount() {
    this.schoolClassDetailService.handleLoadSchool(this.props.params.schoolId);
    this.schoolClassDetailService.handleLoadClass(
      this.props.params.schoolId,
      this.props.params.classId,
    );
  }

  render() {
    return (
      <StudentRecordScene
        school={this.schoolClassDetailService.school}
        class={this.schoolClassDetailService.class}
        schoolId={this.props.params.schoolId}
        classId={this.props.params.classId}
        fetching={
          this.schoolClassDetailService.fetchSchool.fetching ||
          this.schoolClassDetailService.fetchClass.fetching
        }
      />
    );
  }
}

export default observer(StudentRecordSceneContainer);
