import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import StudentForm from './StudentForm';
import StudentFormService from '../services/StudentFormService';

class StudentFormContainer extends Component {

  static propTypes = {
    studentId: PropTypes.string,
    schoolId: PropTypes.string,
    classId: PropTypes.string,
  };

  static defaultProps = {
    studentId: null,
    schoolId: null,
    classId: null,
  };

  studentFormService = new StudentFormService();
  componentWillMount() {
    this.studentFormService.handleLoad(this.props.studentId, this.props.schoolId, this.props.classId);
  }

  render() {
    return (
      <StudentForm
        onSubmit={this.studentFormService.handleSubmit}
        onChange={this.studentFormService.form.setValue}
        onReset={this.studentFormService.form.reset}
        values={this.studentFormService.form.getValues()}
        errors={this.studentFormService.form.errors}
        submitting={this.studentFormService.submit.fetching}
        isDirty={this.studentFormService.form.isDirty}
      />
    );
  }
}

export default observer(StudentFormContainer);
