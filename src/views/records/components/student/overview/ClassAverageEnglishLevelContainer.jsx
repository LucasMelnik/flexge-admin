import React, { Component } from 'react';
import PropTypes from 'prop-types';
import findLast from 'lodash/findLast';
import { observer } from 'mobx-react';
import ClassAverageEnglishLevel from './ClassAverageEnglishLevel';
import StudentRecordListService from '../../../services/StudentRecordListService';
import { englishLevelCourses } from '../../../../../core/consts';

class ClassAverageEnglishLevelContainer extends Component {
  static propTypes = {
    schoolId: PropTypes.string.isRequired,
    classId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    StudentRecordListService.init(this.props.schoolId, this.props.classId);
  }

  render() {
    if (!StudentRecordListService.students || !StudentRecordListService.students.length) return null;
    const averageInitialEnglishLevel = StudentRecordListService.students.filter(student => student.initialEnglishLevel).reduce((acc, student) => (
      acc + student.initialEnglishLevel), 0) / StudentRecordListService.students.length;
    const averageCurrentEnglishLevel = StudentRecordListService.students.filter(student => student.currentEnglishLevel).reduce((acc, student) => (
      acc + student.currentEnglishLevel), 0) / StudentRecordListService.students.length;
    const initialCourse = findLast(englishLevelCourses, course => course.value <= averageInitialEnglishLevel);
    const currentCourse = findLast(englishLevelCourses, course => course.value <= averageCurrentEnglishLevel);
    return (
      <ClassAverageEnglishLevel
        averageInitialEnglishLevel={averageInitialEnglishLevel}
        averageCurrentEnglishLevel={averageCurrentEnglishLevel}
        initialCourse={initialCourse.label}
        currentCourse={currentCourse.label}
      />
    );
  }
}

export default observer(ClassAverageEnglishLevelContainer);
