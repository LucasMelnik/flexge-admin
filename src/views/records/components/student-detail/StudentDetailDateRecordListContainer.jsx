import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudentDetailDateRecordList from './StudentDetailDateRecordList';
import StudentRecordDetailService from '../../services/StudentRecordDetailService';
import StudentRecordDetailExecutionResultDialogService from '../../services/StudentRecordDetailExecutionResultDialogService';

class StudentDetailDateRecordListContainer extends Component {

  static propTypes = {
    studentId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    StudentRecordDetailService.init(this.props.studentId);
    StudentRecordDetailService.loadByDates();
  }

  render() {
    return (
      <StudentDetailDateRecordList
        contents={toJS(StudentRecordDetailService.contents)}
        fetching={StudentRecordDetailService.fetchDates.fetching}
        onDetailExecutionResult={StudentRecordDetailExecutionResultDialogService.handleShow}
        onChange={StudentRecordDetailService.form.setValue}
        onFilter={StudentRecordDetailService.loadByDates}
        filterValues={StudentRecordDetailService.form.getValues()}
      />
    );
  }
}

export default observer(StudentDetailDateRecordListContainer);
