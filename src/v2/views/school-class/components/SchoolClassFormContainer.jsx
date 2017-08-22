import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import SchoolClassForm from './SchoolClassForm';
import SchoolClassFormService from '../services/SchoolClassFormService';
import StateService from '../../../core/services/StateService';

class SchoolClassFormContainer extends Component {

  static propTypes = {
    schoolId: PropTypes.string,
    classId: PropTypes.string,
  }

  static defaultProps = {
    schoolId: null,
    classId: null,
  }

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
        error={SchoolClassFormService.submit.error}
        isDirty={SchoolClassFormService.form.isDirty}
        states={toJS(StateService.states)}
      />
    )
  }
}

export default observer(SchoolClassFormContainer);
