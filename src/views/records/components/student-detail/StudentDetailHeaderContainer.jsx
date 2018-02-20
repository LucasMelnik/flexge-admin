import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import StudentOverviewRecordDetailService from '../../services/StudentOverviewRecordDetailService';
import StudentDetailHeader from './StudentDetailHeader';

class StudentDetailHeaderContainer extends Component {
  static propTypes = {
    studentId: PropTypes.string.isRequired,
  };

  componentWillMount() {
    StudentOverviewRecordDetailService.handleLoad(this.props.studentId);
  }

  render() {
    return (
      <StudentDetailHeader
        student={StudentOverviewRecordDetailService.student}
        fetching={
          StudentOverviewRecordDetailService.fetch.fetching ||
          !StudentOverviewRecordDetailService.student.id
        }
      />
    );
  }
}

export default observer(StudentDetailHeaderContainer);
