import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ChangeCourseFormService from '../services/ChangeCourseFormService';
import ChangeCourseForm from './ChangeCourseForm';

class ChangeCourseFormContainer extends Component {

  static propTypes = {
    studentId: PropTypes.string,
  };

  static defaultProps = {
    studentId: null,
  };

  changeCourseFormService = new ChangeCourseFormService();
  componentWillMount() {
    this.changeCourseFormService.handleLoad(this.props.studentId);
  }

  render() {
    return (
      <ChangeCourseForm
        onSubmit={this.changeCourseFormService.handleSubmit}
        onChange={this.changeCourseFormService.form.setValue}
        onReset={this.changeCourseFormService.form.reset}
        values={this.changeCourseFormService.form.getValues()}
        errors={this.changeCourseFormService.form.errors}
        submitting={this.changeCourseFormService.submit.fetching}
        isDirty={this.changeCourseFormService.form.isDirty}
      />
    );
  }
}

export default observer(ChangeCourseFormContainer);
