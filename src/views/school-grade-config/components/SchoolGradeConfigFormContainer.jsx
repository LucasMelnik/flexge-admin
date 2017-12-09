import React, { Component } from 'react';
import { observer } from 'mobx-react';
import SchoolGradeConfigForm from './SchoolGradeConfigForm';
import SchoolGradeConfigFormService from '../services/SchoolGradeConfigFormService';

class SchoolGradeConfigFormContainer extends Component {

  schoolGradeConfigFormService = new SchoolGradeConfigFormService();
  componentWillMount() {
    const school = JSON.parse(localStorage.getItem('school'));
    this.schoolGradeConfigFormService.init(school ? school._id : null);
  }

  render() {
    return (
      <SchoolGradeConfigForm
        onSubmit={this.schoolGradeConfigFormService.handleSubmit}
        onChange={this.schoolGradeConfigFormService.form.setValue}
        onReset={this.schoolGradeConfigFormService.form.reset}
        values={this.schoolGradeConfigFormService.form.getValues()}
        errors={this.schoolGradeConfigFormService.form.errors}
        submitting={
          this.schoolGradeConfigFormService.submit.fetching ||
          this.schoolGradeConfigFormService.fetch.fetching
        }
        isDirty={this.schoolGradeConfigFormService.form.isDirty}
      />
    );
  }
}

export default observer(SchoolGradeConfigFormContainer);
