import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import PaymentListContainer from './PaymentListContainer';
import PaymentListFilterContainer from './PaymentListFilterContainer';
import Separator from '../../../core/layout/Separator';

const PaymentListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Payments',
        },
      ]}
    />
    <Card
      title="Payments"
      actions={
        <Button
          type="primary"
          label="New payments"
          icon="plus"
          disabled={true}
          onClick={() => browserHistory.push('/payments/new')}
        />
      }
    >
      <PaymentListFilterContainer />
      <Separator size="md" />
      <PaymentListContainer />
    </Card>
  </div>
);

export default PaymentListScene;
