import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import { browserHistory } from 'react-router';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import Async from '../../../core/layout/Async';

const DistributorForm = props => (
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
      errorText={get(props.errors, 'name', null)}
    />
    <FormButtons
      confirmLabel={props.values.id ? 'Update Distributor' : 'Create Distributor'}
      isDisabled={props.submitting || !props.isDirty()}
      isSubmitting={props.submitting}
      onReset={props.onReset}
    />
  </form>
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
};

export default DistributorForm;
