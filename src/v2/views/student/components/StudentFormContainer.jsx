import React from 'react';
import { observer } from 'mobx-react';
import StudentForm from './StudentForm';
import StudentFormService from '../services/StudentFormService';

const StudentFormContainer = () => (
  <StudentForm
    onSubmit={StudentFormService.handleSubmit}
    onChange={StudentFormService.form.setValue}
    onReset={StudentFormService.form.reset}
    values={StudentFormService.form.getValues()}
    errors={StudentFormService.form.errors}
    submitting={StudentFormService.fetch.fetching}
    error={StudentFormService.fetch.error}
    isDirty={StudentFormService.form.isDirty}
  />
);

export default observer(StudentFormContainer);
