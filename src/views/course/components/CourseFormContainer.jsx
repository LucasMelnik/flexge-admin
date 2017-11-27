import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CourseForm from './CourseForm';
import CourseFormService from '../services/CourseFormService';

class CourseFormContainer extends Component {

  static propTypes = {
    courseId: PropTypes.string,
  };

  static defaultProps = {
    courseId: null,
  };

  courseFormService = new CourseFormService();
  componentWillMount() {
    this.courseFormService.handleLoad(this.props.courseId);
  }

  render() {
    return (
      <CourseForm
        onSubmit={this.courseFormService.handleSubmit}
        onChange={this.courseFormService.form.setValue}
        onReset={this.courseFormService.form.reset}
        values={this.courseFormService.form.getValues()}
        errors={this.courseFormService.form.errors}
        submitting={this.courseFormService.fetch.fetching}
        isDirty={this.courseFormService.form.isDirty}
      />
    );
  }
}

export default observer(CourseFormContainer);
