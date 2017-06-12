import React from 'react';
import { observer } from 'mobx-react';
import CompanyManagerForm from './CompanyManagerForm';
import CompanyManagerFormService from '../services/CompanyManagerFormService';

const CompanyManagerFormContainer = () => (
  <CompanyManagerForm
    onSubmit={CompanyManagerFormService.handleSubmit}
    onChange={CompanyManagerFormService.form.setValue}
    onReset={CompanyManagerFormService.form.reset}
    values={CompanyManagerFormService.form.getValues()}
    errors={CompanyManagerFormService.form.errors}
    submitting={CompanyManagerFormService.fetch.fetching}
    error={CompanyManagerFormService.fetch.error}
    isDirty={CompanyManagerFormService.form.isDirty}
  />
);

export default observer(CompanyManagerFormContainer);
