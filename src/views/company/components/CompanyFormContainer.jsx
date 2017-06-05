import React from 'react';
import { observer } from 'mobx-react';
import CompanyForm from './CompanyForm';
import CompanyFormService from '../services/CompanyFormService';

const CompanyFormContainer = () => (
  <CompanyForm
    onSubmit={CompanyFormService.handleSubmit}
    onChange={CompanyFormService.form.setValue}
    onReset={CompanyFormService.form.reset}
    values={CompanyFormService.form.getValues()}
    errors={CompanyFormService.form.errors}
    submitting={CompanyFormService.fetch.fetching}
    error={CompanyFormService.submit.error}
    isDirty={CompanyFormService.form.isDirty}
  />
);

export default observer(CompanyFormContainer);
