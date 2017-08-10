import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import { browserHistory } from 'react-router';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';

const DistributorForm = props => (
  <Card
    title={props.values.id ? 'Update Distributor' : 'Create Distributor'}
    actions={
      (
        <Button
          icon="fa-arrow-left"
          label="Back"
          type="default"
          onClick={() => browserHistory.push('/v2/distributors')}
        />
      )
    }
  >
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit();
      }}
    >
      <TextInput
        disabled={props.submitting}
        label="Distributor Name"
        value={get(props.values, 'name', '')}
        onChange={value => props.onChange('name', value)}
        description={get(props.errors, 'name', null)}
        fieldValidation={get(props.errors, 'name', null) && 'error'}
      />
      <FormButtons
        confirmLabel={props.values.id ? 'Update Distributor' : 'Create Distributor'}
        isDisabled={props.submitting || !props.isDirty()}
        onReset={props.onReset}
      />
    </form>
  </Card>
);

DistributorForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

DistributorForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onReset: () => false,
  onChange: () => false,
};

export default DistributorForm;
