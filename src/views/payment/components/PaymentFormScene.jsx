import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import UnitTypeFormContainer from './UnitTypeFormContainer';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';

const PaymentFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: `${props.params.typeId ? 'Edit Unit Type' : 'Create Unit Type'}`,
        },
      ]}
    />
    <Card
      title={props.params.typeId ? 'Edit Unit Type' : 'Create Unit Type'}
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
      <UnitTypeFormContainer typeId={props.params.typeId} />
    </Card>
  </div>
);

PaymentFormScene.propTypes = {
  params: PropTypes.shape({
    typeId: PropTypes.string,
  }),
};

PaymentFormScene.defaultProps = {
  params: null,
};

export default PaymentFormScene;
