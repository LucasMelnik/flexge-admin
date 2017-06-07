import React from 'react';
import { observer } from 'mobx-react';
import TeacherForm from './TeacherForm';
import TeacherFormService from '../services/TeacherFormService';

const TeacherFormContainer = () => (
  <TeacherForm
    onSubmit={TeacherFormService.handleSubmit}
    onChange={TeacherFormService.form.setValue}
    onReset={TeacherFormService.form.reset}
    values={TeacherFormService.form.getValues()}
    errors={TeacherFormService.form.errors}
    submitting={TeacherFormService.fetch.fetching}
    error={TeacherFormService.submit.error}
    isDirty={TeacherFormService.form.isDirty}
  />
);

export default observer(TeacherFormContainer);
