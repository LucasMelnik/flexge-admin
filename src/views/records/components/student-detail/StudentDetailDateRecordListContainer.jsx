import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StudentDetailDateRecordList from './StudentDetailDateRecordList';
import StudentRecordDetailService from '../../services/StudentRecordDetailService';

class StudentDetailDateRecordListContainer extends Component {

  static propTypes = {
    studentId: PropTypes.string.isRequired,
  };

  componentDidMount() {
    StudentRecordDetailService.loadByDates(this.props.studentId);
  }

  render() {
    return (
      <StudentDetailDateRecordList
        contents={toJS(StudentRecordDetailService.contents)}
        fetching={StudentRecordDetailService.fetchDates.fetching}
      />
    );
  }
}

export default observer(StudentDetailDateRecordListContainer);
