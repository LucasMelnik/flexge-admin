import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import FinishedStudentCourseList from './FinishedStudentCourseList';
import FinishedStudentCourseListService from '../../services/FinishedStudentCourseListService';

class UnitItemErrorRecordListContainer extends Component {

  componentDidMount() {
    FinishedStudentCourseListService.init();
  }

  render() {
    return (
      <FinishedStudentCourseList
        students={toJS(FinishedStudentCourseListService.students)}
        fetching={FinishedStudentCourseListService.fetch.fetching}
      />
    );
  }
}

export default observer(UnitItemErrorRecordListContainer);
