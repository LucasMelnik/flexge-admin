import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudentGradeList from './StudentGradeList';
import StudentGradeListService from '../../services/StudentGradeListService';

class StudentGradeListContainer extends Component {

  static propTypes = {
    schoolId: PropTypes.string.isRequired,
    classId: PropTypes.string.isRequired,
  };

  studentGradeListService = new StudentGradeListService();
  componentDidMount() {
    this.studentGradeListService.load(this.props.schoolId, this.props.classId);
  }

  render() {
    return (
      <StudentGradeList
        students={toJS(this.studentGradeListService.students)}
        evaluationPeriods={toJS(this.studentGradeListService.evaluationPeriods)}
        fetching={this.studentGradeListService.fetch.fetching}
      />
    );
  }
}

export default observer(StudentGradeListContainer);
