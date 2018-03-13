import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import StudentResetService from '../services/StudentResetService';
import Button from '../../../core/form/Button';

class StudentResetButtonContainer extends Component {

  static propTypes = {
    studentId: PropTypes.string.isRequired,
  };

  studentResetService = new StudentResetService();
  componentWillMount() {
    this.studentResetService.init(this.props.studentId);
  }

  render() {
    return (
      <Button
        loading={this.studentResetService.submit.fetching}
        disabled={this.studentResetService.submit.fetching}
        onClick={this.studentResetService.handleReset}
        label="Reset Student"
      />
    );
  }
}

export default observer(StudentResetButtonContainer);
