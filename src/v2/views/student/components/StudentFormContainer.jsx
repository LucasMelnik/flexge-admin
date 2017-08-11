import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import StudentForm from './StudentForm';
import StudentFormService from '../services/StudentFormService';

class StudentFormContainer extends Component {

  static propTypes = {
    studentId: PropTypes.string,
  }

  static defaultProps = {
    studentId: null,
  }

  componentWillMount() {
    StudentFormService.handleLoad(this.props.studentId);
  }

  render() {
    return (
      <StudentForm
        onSubmit={StudentFormService.handleSubmit}
        onChange={StudentFormService.form.setValue}
        onReset={StudentFormService.form.reset}
        values={StudentFormService.form.getValues()}
        errors={StudentFormService.form.errors}
        submitting={StudentFormService.fetch.fetching}
        error={StudentFormService.fetch.error}
        isDirty={StudentFormService.form.isDirty}
      />
    );
  }
}

export default observer(StudentFormContainer);
