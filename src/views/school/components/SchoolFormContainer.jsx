import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import SchoolForm from './SchoolForm';
import SchoolFormService from '../services/SchoolFormService';
import StateService from '../../../core/services/StateService';

class SchoolFormContainer extends Component {

  static propTypes = {
    companyId: PropTypes.string.isRequired,
    schoolId: PropTypes.string,
  };

  static defaultProps = {
    schoolId: null,
  };

  componentWillMount() {
    SchoolFormService.init(this.props.schoolId, this.props.companyId);
  }

  render() {
    return (
      <SchoolForm
        onSubmit={SchoolFormService.handleSubmit}
        onChange={SchoolFormService.form.setValue}
        onReset={SchoolFormService.form.reset}
        values={SchoolFormService.form.getValues()}
        errors={SchoolFormService.form.errors}
        submitting={SchoolFormService.submit.fetching}
        error={SchoolFormService.submit.error}
        isDirty={SchoolFormService.form.isDirty}
        states={toJS(StateService.states)}
      />
    )
  }
}

export default observer(SchoolFormContainer);
