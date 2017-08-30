import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import TeacherForm from './TeacherForm';
import TeacherFormService from '../services/TeacherFormService';

class TeacherFormContainer extends Component {

  static propTypes = {
    teacherId: PropTypes.string,
  }

  static defaultProps = {
    teacherId: null,
  }

  componentWillMount() {
    TeacherFormService.handleLoad(this.props.teacherId);
  }

  render() {
    return (
      <TeacherForm
        onSubmit={TeacherFormService.handleSubmit}
        onChange={TeacherFormService.form.setValue}
        onReset={TeacherFormService.form.reset}
        values={TeacherFormService.form.getValues()}
        errors={TeacherFormService.form.errors}
        submitting={TeacherFormService.fetch.fetching}
        error={TeacherFormService.submit.error}
        isDirty={TeacherFormService.form.isDirty}
      />
    );
  }
}

export default observer(TeacherFormContainer);
