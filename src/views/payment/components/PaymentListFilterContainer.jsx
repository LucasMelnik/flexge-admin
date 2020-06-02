import React from 'react';
import { observer } from 'mobx-react';
import PaymentListFilter from './PaymentListFilter';
import PaymentListService from '../services/PaymentListService';

const PaymentListFilterContainer = () => (
  <PaymentListFilter
    values={PaymentListService.form.getValues()}
    onChange={PaymentListService.form.setValue}
    submitting={PaymentListService.fetch.fetching}
    onSubmit={PaymentListService.load}
  />
);

export default observer(PaymentListFilterContainer);
