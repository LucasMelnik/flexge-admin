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

  componentWillMount() {
    SchoolClassFormService.init(this.props.schoolId, this.props.classId);
  }

  render() {
    return (
      <SchoolClassForm
        onSubmit={SchoolClassFormService.handleSubmit}
        onChange={SchoolClassFormService.form.setValue}
        onReset={SchoolClassFormService.form.reset}
        values={SchoolClassFormService.form.getValues()}
        errors={SchoolClassFormService.form.errors}
        submitting={SchoolClassFormService.submit.fetching}
        isDirty={SchoolClassFormService.form.isDirty}
      />
    );
  }
}

export default observer(SchoolClassFormContainer);
