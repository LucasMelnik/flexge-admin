import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import SchoolForm from './SchoolForm';
import SchoolFormService from '../services/SchoolFormService';
import StateService from '../../../core/services/StateService';

class SchoolFormContainer extends Component {

  static propTypes = {
    schoolId: PropTypes.string,
    currentCompany: PropTypes.string,
  };

  static defaultProps = {
    schoolId: null,
    currentCompany: null,
  };

  componentWillMount() {
    SchoolFormService.init(this.props.schoolId, this.props.currentCompany);
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
        isDirty={SchoolFormService.form.isDirty}
        states={toJS(StateService.states)}
        disableCompany={!!this.props.currentCompany}
      />
    );
  }
}

export default observer(SchoolFormContainer);
