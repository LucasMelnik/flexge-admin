import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import FinishedStudentCourseList from './FinishedStudentCourseList';
import FinishedStudentCourseListService from '../../services/FinishedStudentCourseListService';
import WhitelabelService from '../../../../core/services/WhitelabelService';

class UnitItemErrorRecordListContainer extends Component {

  componentDidMount() {
    FinishedStudentCourseListService.init();
  }

  render() {
    return (
      <FinishedStudentCourseList
        students={toJS(FinishedStudentCourseListService.students)}
        pagination={toJS(FinishedStudentCourseListService.pagination)}
        fetching={FinishedStudentCourseListService.fetch.fetching}
        onDownload={FinishedStudentCourseListService.handleDownloadCertificate}
        isWhitelabel={WhitelabelService.isWhitelabelDistribution}
        onChange={FinishedStudentCourseListService.load}
      />
    );
  }
}

export default observer(UnitItemErrorRecordListContainer);
