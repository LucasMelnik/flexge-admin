import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudentDetailContentRecordList from './StudentDetailContentRecordList';
import StudentRecordDetailService from '../../services/StudentRecordDetailService';
import StudentRecordDetailExecutionResultDialogService from '../../services/StudentRecordDetailExecutionResultDialogService';

class StudentDetailContentRecordListContainer extends Component {

  static propTypes = {
    studentId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    StudentRecordDetailService.init(this.props.studentId);
  }

  render() {
    return (
      <StudentDetailContentRecordList
        contents={toJS(StudentRecordDetailService.contentsDetail)}
        fetching={StudentRecordDetailService.fetchContent.fetching}
        onDetailExecutionResult={StudentRecordDetailExecutionResultDialogService.handleShow}
      />
    );
  }
}

export default observer(StudentDetailContentRecordListContainer);
