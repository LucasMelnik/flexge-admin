import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CompanyManagerForm from './CompanyManagerForm';
import CompanyManagerFormService from '../services/CompanyManagerFormService';

class CompanyManagerFormContainer extends Component {

  static propTypes = {
    companyId: PropTypes.string.isRequired,
  }

  componentDidMount() {
    CompanyManagerFormService.setInitialValues(this.props.companyId);
  }

  render() {
    return (
      <CompanyManagerForm
        onSubmit={CompanyManagerFormService.handleSubmit}
        onChange={CompanyManagerFormService.form.setValue}
        values={CompanyManagerFormService.form.getValues()}
        errors={CompanyManagerFormService.form.errors}
        submitting={CompanyManagerFormService.fetch.fetching}
        error={CompanyManagerFormService.fetch.error}
        isDirty={CompanyManagerFormService.form.isDirty}
      />
    );
  }
}

export default observer(CompanyManagerFormContainer);
