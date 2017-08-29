import React from 'react';
import { observer } from 'mobx-react';
import ManagerForm from './ManagerForm';
import ManagerFormService from '../services/ManagerFormService';

const ManagerFormContainer = () => (
  <ManagerForm
    onSubmit={ManagerFormService.handleSubmit}
    onChange={ManagerFormService.form.setValue}
    onReset={ManagerFormService.form.reset}
    values={ManagerFormService.form.getValues()}
    errors={ManagerFormService.form.errors}
    isDirty={ManagerFormService.form.isDirty}
    submitting={ManagerFormService.submit.fetching || ManagerFormService.fetch.fetching}
    error={ManagerFormService.submit.error}
  />
);

export default observer(ManagerFormContainer);
