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

  schoolFormService = new SchoolFormService();
  componentWillMount() {
    this.schoolFormService.init(this.props.schoolId, this.props.currentCompany);
  }

  render() {
    return (
      <SchoolForm
        onSubmit={this.schoolFormService.handleSubmit}
        onChange={this.schoolFormService.form.setValue}
        onReset={this.schoolFormService.form.reset}
        values={this.schoolFormService.form.getValues()}
        errors={this.schoolFormService.form.errors}
        submitting={this.schoolFormService.submit.fetching}
        isDirty={this.schoolFormService.form.isDirty}
        states={toJS(StateService.states)}
        disableCompany={!!this.props.currentCompany}
      />
    );
  }
}

export default observer(SchoolFormContainer);
