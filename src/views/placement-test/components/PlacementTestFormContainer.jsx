import React from 'react';
import { observer } from 'mobx-react';
import PlacementTestForm from './PlacementTestForm';
import PlacementTestFormService from '../services/PlacementTestFormService';

const PlacementTestFormContainer = () => (
  <PlacementTestForm
    onSubmit={PlacementTestFormService.handleSubmit}
    onChange={PlacementTestFormService.form.setValue}
    onReset={PlacementTestFormService.form.reset}
    values={PlacementTestFormService.form.getValues()}
    errors={PlacementTestFormService.form.errors}
    submitting={PlacementTestFormService.fetch.fetching}
    error={PlacementTestFormService.fetch.error}
    isDirty={PlacementTestFormService.form.isDirty}
  />
);

export default observer(PlacementTestFormContainer);
