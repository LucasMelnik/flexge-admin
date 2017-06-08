import React from 'react';
import { observer } from 'mobx-react';
import SchoolManagerForm from './SchoolManagerForm';
import SchoolManagerFormService from '../services/SchoolManagerFormService';

const SchoolManagerFormContainer = () => (
  <SchoolManagerForm
    onSubmit={SchoolManagerFormService.handleSubmit}
    onChange={SchoolManagerFormService.form.setValue}
    onReset={SchoolManagerFormService.form.reset}
    values={SchoolManagerFormService.form.getValues()}
    errors={SchoolManagerFormService.form.errors}
    submitting={SchoolManagerFormService.fetch.fetching}
    error={SchoolManagerFormService.fetch.error}
    isDirty={SchoolManagerFormService.form.isDirty}
  />
);

export default observer(SchoolManagerFormContainer);
