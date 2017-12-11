import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import StudentDetailService from '../../services/StudentDetailService';
import StudentDetailHeader from './StudentDetailHeader';

class StudentDetailHeaderContainer extends Component {
  static propTypes = {
    studentId: PropTypes.string.isRequired,
  };

  studentDetailService = new StudentDetailService();
  componentWillMount() {
    this.studentDetailService.handleLoad(this.props.studentId);
  }

  render() {
    return (
      <StudentDetailHeader
        student={this.studentDetailService.student}
        fetching={this.studentDetailService.fetch.fetching}
      />
    );
  }
}

export default observer(StudentDetailHeaderContainer);
