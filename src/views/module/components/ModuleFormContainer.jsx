import React from 'react';
import { observer } from 'mobx-react';
import ModuleForm from './ModuleForm';
import ModuleFormService from '../services/ModuleFormService';

const ModuleFormContainer = () => (
  <ModuleForm
    onSubmit={ModuleFormService.handleSubmit}
    onChange={ModuleFormService.form.setValue}
    onReset={ModuleFormService.form.reset}
    values={ModuleFormService.form.getValues()}
    errors={ModuleFormService.form.errors}
    submitting={ModuleFormService.fetch.fetching}
    error={ModuleFormService.submit.error}
    isDirty={ModuleFormService.form.isDirty}
  />
);

export default observer(ModuleFormContainer);
