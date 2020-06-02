import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import PaymentFormContainer from './PaymentFormContainer';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';

const PaymentFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: `${props.params.paymentId ? 'Edit Payment' : 'Create Payment'}`,
        },
      ]}
    />
    <Card
      title={props.params.paymentId ? 'Edit Payment' : 'Create Payment'}
      actions={
        (
          <Button
            icon="arrow-left"
            label="Back"
            type="default"
            onClick={() => browserHistory.goBack()}
          />
        )
      }
    >
      <PaymentFormContainer paymentId={props.params.paymentId} />
    </Card>
  </div>
);

PaymentFormScene.propTypes = {
  params: PropTypes.shape({
    paymentId: PropTypes.string,
  }),
};

PaymentFormScene.defaultProps = {
  params: null,
};

export default PaymentFormScene;
