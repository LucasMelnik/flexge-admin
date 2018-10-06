import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import SchoolForm from './SchoolForm';
import SchoolFormService from '../services/SchoolFormService';

class SchoolFormContainer extends Component {

  static propTypes = {
    schoolId: PropTypes.string,
    currentCompany: PropTypes.string,
    companyCountry: PropTypes.string,
  };

  static defaultProps = {
    schoolId: null,
    currentCompany: null,
    companyCountry: null,
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
        disableCompany={!!this.props.currentCompany}
        companyCountry={this.props.companyCountry}
      />
    );
  }
}

export default observer(SchoolFormContainer);
