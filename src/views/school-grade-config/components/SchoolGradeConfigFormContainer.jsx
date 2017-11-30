import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import SchoolGradeConfigForm from './SchooGradeConfigForm';
import SchoolGradeConfigFormService from '../services/SchoolGradeConfigFormService';

class SchoolGradeConfigFormContainer extends Component {
  static propTypes = {
    schoolId: PropTypes.string.isRequired,
  };

  schoolGradeConfigFormService = new SchoolGradeConfigFormService();
  componentWillMount() {
    this.schoolGradeConfigFormService.init(this.props.schoolId);
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
