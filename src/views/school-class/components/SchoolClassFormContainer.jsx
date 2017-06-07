import React from 'react';
import { observer } from 'mobx-react';
import SchoolClassForm from './SchoolClassForm';
import SchoolClassFormService from '../services/SchoolClassFormService';

const SchoolClassFormContainer = () => (
  <SchoolClassForm
    onSubmit={SchoolClassFormService.handleSubmit}
    onChange={SchoolClassFormService.form.setValue}
    onReset={SchoolClassFormService.form.reset}
    values={SchoolClassFormService.form.getValues()}
    errors={SchoolClassFormService.form.errors}
    submitting={SchoolClassFormService.fetch.fetching}
    error={SchoolClassFormService.submit.error}
    isDirty={SchoolClassFormService.form.isDirty}
  />
);

export default observer(SchoolClassFormContainer);
