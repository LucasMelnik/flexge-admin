import React from 'react';
import { observer } from 'mobx-react';
import DistributorForm from './DistributorForm';
import DistributorFormService from '../services/DistributorFormService';

const DistributorFormContainer = () => (
  <DistributorForm
    onSubmit={DistributorFormService.handleSubmit}
    onChange={DistributorFormService.form.setValue}
    onReset={DistributorFormService.form.reset}
    values={DistributorFormService.form.getValues()}
    errors={DistributorFormService.form.errors}
    submitting={DistributorFormService.fetch.fetching}
    error={DistributorFormService.fetch.error}
    isDirty={DistributorFormService.form.isDirty}
  />
);

export default observer(DistributorFormContainer);
