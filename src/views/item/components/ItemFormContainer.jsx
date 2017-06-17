import React from 'react';
import { observer } from 'mobx-react';
import ItemForm from './ItemForm';
import ItemFormService from '../services/ItemFormService';

const ItemFormContainer = () => (
  <ItemForm
    onSubmit={ItemFormService.handleSubmit}
    setValidationsByItemType={ItemFormService.setValidationsByItemType}
    onChange={ItemFormService.form.setValue}
    onReset={ItemFormService.form.reset}
    values={ItemFormService.form.getValues()}
    errors={ItemFormService.form.errors}
    isDirty={ItemFormService.form.isDirty}
    submitting={ItemFormService.submit.fetching}
    error={ItemFormService.submit.error}
  />
);

export default observer(ItemFormContainer);
