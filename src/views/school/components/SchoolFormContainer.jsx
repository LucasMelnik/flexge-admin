import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import SchoolForm from './SchoolForm';
import SchoolFormService from '../services/SchoolFormService';
import StateService from '../../../core/services/StateService';

const SchoolFormContainer = () => (
  <SchoolForm
    onSubmit={SchoolFormService.handleSubmit}
    onChange={SchoolFormService.form.setValue}
    onReset={SchoolFormService.form.reset}
    values={SchoolFormService.form.getValues()}
    errors={SchoolFormService.form.errors}
    submitting={SchoolFormService.submit.fetching}
    error={SchoolFormService.submit.error}
    isDirty={SchoolFormService.form.isDirty}
    states={toJS(StateService.states)}
  />
);

export default observer(SchoolFormContainer);
