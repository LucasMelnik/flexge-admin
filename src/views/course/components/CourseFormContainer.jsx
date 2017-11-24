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

  componentWillMount() {
    CourseFormService.handleLoad(this.props.courseId);
  }

  render() {
    return (
      <CourseForm
        onSubmit={CourseFormService.handleSubmit}
        onChange={CourseFormService.form.setValue}
        onReset={CourseFormService.form.reset}
        values={CourseFormService.form.getValues()}
        errors={CourseFormService.form.errors}
        submitting={CourseFormService.fetch.fetching}
        isDirty={CourseFormService.form.isDirty}
      />
    );
  }
}

export default observer(CourseFormContainer);
