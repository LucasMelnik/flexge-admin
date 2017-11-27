import React from 'react';
import { observer } from 'mobx-react';
import ManagerForm from './ManagerForm';
import ManagerFormService from '../services/ManagerFormService';

const ManagerFormContainer = () => {
  const managerFormService = new ManagerFormService();
  return (
    <ManagerForm
      onSubmit={managerFormService.handleSubmit}
      onChange={managerFormService.form.setValue}
      onReset={managerFormService.form.reset}
      values={managerFormService.form.getValues()}
      errors={managerFormService.form.errors}
      isDirty={managerFormService.form.isDirty}
      submitting={managerFormService.submit.fetching || managerFormService.fetch.fetching}
      error={managerFormService.submit.error}
    />
  );
}

export default observer(ManagerFormContainer);
