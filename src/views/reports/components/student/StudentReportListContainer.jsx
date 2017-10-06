import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudentReportList from './StudentReportList';
import StudentReportListService from '../../services/StudentReportListService';

class StudentReportListContainer extends Component {

  componentDidMount() {
    StudentReportListService.init();
  }

  render() {
    return (
      <StudentReportList
        students={toJS(StudentReportListService.students)}
        fetching={StudentReportListService.fetch.fetching}
      />
    );
  }
}

export default observer(StudentReportListContainer);
