import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ReactivateStudentForm from './ReactivateStudentForm';
import ReactivateStudentFormService from '../services/ReactivateStudentFormService';

class ReactivateStudentFormContainer extends Component {

  static propTypes = {
    studentId: PropTypes.string,
  };

  static defaultProps = {
    studentId: null,
  };

  reactivateStudentFormService = new ReactivateStudentFormService();
  componentWillMount() {
    this.reactivateStudentFormService.handleLoad(this.props.studentId);
  }

  render() {
    return (
      <ReactivateStudentForm
        onSubmit={this.reactivateStudentFormService.handleSubmit}
        onChange={this.reactivateStudentFormService.form.setValue}
        onReset={this.reactivateStudentFormService.form.reset}
        values={this.reactivateStudentFormService.form.getValues()}
        errors={this.reactivateStudentFormService.form.errors}
        submitting={this.reactivateStudentFormService.submit.fetching}
        isDirty={this.reactivateStudentFormService.form.isDirty}
      />
    );
  }
}

export default observer(ReactivateStudentFormContainer);
