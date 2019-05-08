import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import SchoolForm from './SchoolForm';
import SchoolFormService from '../services/SchoolFormService';
import { MASTERTEST_DISTRIBUTOR_ID } from '../../../core/consts';

class SchoolFormContainer extends Component {

  static propTypes = {
    schoolId: PropTypes.string,
    currentCompany: PropTypes.string,
    companyCountry: PropTypes.string,
    companyDistributor: PropTypes.string,
  };

  static defaultProps = {
    schoolId: null,
    currentCompany: null,
    companyCountry: null,
    companyDistributor: null,
  };

  schoolFormService = new SchoolFormService();
  componentWillMount() {
    this.schoolFormService.init(this.props.schoolId, this.props.currentCompany);
  }

  componentDidUpdate() {
    if (this.props.companyDistributor && this.props.companyDistributor === MASTERTEST_DISTRIBUTOR_ID) {
      this.schoolFormService.addInepToRequired();
    }
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
        companyDistributor={this.props.companyDistributor}
      />
    );
  }
}

export default observer(SchoolFormContainer);
