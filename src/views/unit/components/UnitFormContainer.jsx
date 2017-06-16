import React from 'react';
import { observer } from 'mobx-react';
import UnitForm from './UnitForm';
import UnitFormService from '../services/UnitFormService';

const UnitFormContainer = () => (
  <UnitForm
    onSubmit={UnitFormService.handleSubmit}
    onChange={UnitFormService.form.setValue}
    onReset={UnitFormService.form.reset}
    values={UnitFormService.form.getValues()}
    errors={UnitFormService.form.errors}
    submitting={UnitFormService.fetch.fetching}
    error={UnitFormService.fetch.error}
    isDirty={UnitFormService.form.isDirty}
  />
);

export default observer(UnitFormContainer);
