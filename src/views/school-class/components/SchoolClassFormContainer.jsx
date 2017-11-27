import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import SchoolClassForm from './SchoolClassForm';
import SchoolClassFormService from '../services/SchoolClassFormService';

class SchoolClassFormContainer extends Component {

  static propTypes = {
    schoolId: PropTypes.string.isRequired,
    classId: PropTypes.string,
  };

  static defaultProps = {
    classId: null,
  };

  schoolClassFormService = new SchoolClassFormService();
  componentWillMount() {
    this.schoolClassFormService.init(this.props.schoolId, this.props.classId);
  }

  render() {
    return (
      <SchoolClassForm
        onSubmit={this.schoolClassFormService.handleSubmit}
        onChange={this.schoolClassFormService.form.setValue}
        onReset={this.schoolClassFormService.form.reset}
        values={this.schoolClassFormService.form.getValues()}
        errors={this.schoolClassFormService.form.errors}
        submitting={this.schoolClassFormService.submit.fetching}
        isDirty={this.schoolClassFormService.form.isDirty}
      />
    );
  }
}

export default observer(SchoolClassFormContainer);
