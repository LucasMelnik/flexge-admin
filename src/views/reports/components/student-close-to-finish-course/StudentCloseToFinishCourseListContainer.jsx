import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudentCloseToFinishCourseList from './StudentCloseToFinishCourseList';
import StudentCloseToFinishCourseListService from '../../services/StudentCloseToFinishCourseListService';

class UnitItemErrorRecordListContainer extends Component {

  componentDidMount() {
    StudentCloseToFinishCourseListService.init();
  }

  render() {
    return (
      <StudentCloseToFinishCourseList
        students={toJS(StudentCloseToFinishCourseListService.students)}
        fetching={StudentCloseToFinishCourseListService.fetch.fetching}
      />
    );
  }
}

export default observer(UnitItemErrorRecordListContainer);
