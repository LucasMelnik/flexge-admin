import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Card from '../../../core/layout/Card';
import TextInput from '../../../core/form/TextInput';
import Button from '../../../core/form/Button';
import Separator from '../../../core/layout/Separator';

const DistributorForm = props => (
  <Card>
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit();
      }}
    >
      <TextInput
        floatingLabel
        fullWidth
        disabled={props.submitting}
        label="Distributor Name"
        value={get(props.values, 'name', '')}
        onChange={value => props.onChange('name', value)}
        error={get(props.errors, 'name', '')}
      />
      <Separator size="xs" />
      <Button
        icon="done"
        secondary
        fullWidth
        disabled={props.submitting || !props.isDirty()}
        type="submit"
        label={props.values.id ? 'Update Distributor' : 'Create Distributor'}
      />
      <Separator size="xs" />
      <Button
        icon="clear"
        fullWidth
        disabled={props.submitting}
        onClick={() => browserHistory.push('/distributors')}
        label="Cancel"
      />
    </form>
  </Card>
);

DistributorForm.propTypes = {
  onSubmit: PropTypes.func,
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
  onChange: () => false,
};

export default DistributorForm;
