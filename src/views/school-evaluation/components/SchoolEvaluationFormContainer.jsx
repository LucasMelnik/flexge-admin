import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import SchoolEvaluationFormService from '../services/SchoolEvaluationFormService';
import SchoolEvaluationForm from './SchoolEvaluationForm';

class SchoolEvaluationFormContainer extends Component {
  static propTypes = {
    schoolId: PropTypes.string.isRequired,
    selectedYear: PropTypes.number.isRequired,
  };

  schoolEvaluationFormService = new SchoolEvaluationFormService();
  componentWillMount() {
    this.schoolEvaluationFormService.init(this.props.schoolId);
  }

  render() {
    return (
      <SchoolEvaluationForm
        onSubmit={this.schoolEvaluationFormService.handleSubmit}
        onChange={this.schoolEvaluationFormService.form.setValue}
        onReset={this.schoolEvaluationFormService.form.reset}
        values={this.schoolEvaluationFormService.form.getValues()}
        errors={this.schoolEvaluationFormService.form.errors}
        submitting={this.schoolEvaluationFormService.submit.fetching}
        isDirty={this.schoolEvaluationFormService.form.isDirty}
        selectedYear={this.props.selectedYear}
      />
    );
  }
}

export default observer(SchoolEvaluationFormContainer);
