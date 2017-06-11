import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import CompanyForm from './CompanyForm';
import CompanyFormService from '../services/CompanyFormService';
import StateService from '../../../core/services/StateService';

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
    states={toJS(StateService.states)}
  />
);

export default observer(CompanyFormContainer);
