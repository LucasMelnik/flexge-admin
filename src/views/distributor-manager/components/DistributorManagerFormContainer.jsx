import React from 'react';
import { observer } from 'mobx-react';
import DistributorManagerForm from './DistributorManagerForm';
import DistributorManagerFormService from '../services/DistributorManagerFormService';

const DistributorManagerFormContainer = () =>  (
  <DistributorManagerForm
    onSubmit={DistributorManagerFormService.handleSubmit}
    onChange={DistributorManagerFormService.form.setValue}
    onReset={DistributorManagerFormService.form.reset}
    values={DistributorManagerFormService.form.getValues()}
    errors={DistributorManagerFormService.form.errors}
    submitting={DistributorManagerFormService.fetch.fetching}
    error={DistributorManagerFormService.fetch.error}
    isDirty={DistributorManagerFormService.form.isDirty}
  />
);

export default observer(DistributorManagerFormContainer);
