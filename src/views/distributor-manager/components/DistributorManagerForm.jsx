import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Separator from '../../../core/layout/Separator';
import TextInput from '../../../core/form/TextInput';
import Button from '../../../core/form/Button';

const DistributorManagerForm = props => (
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
      label="Manager Name"
      value={get(props.values, 'name', '')}
      onChange={value => props.onChange('name', value)}
      errorText={get(props.errors, 'name', '')}
    />
    <TextInput
      floatingLabel
      fullWidth
      disabled={props.submitting}
      label="Manager Email"
      value={get(props.values, 'email', '')}
      onChange={value => props.onChange('email', value)}
      errorText={get(props.errors, 'email', '')}
    />
    <Separator size="xs"/>
    <Button
      icon="done"
      secondary
      fullWidth
      disabled={props.submitting || !props.isDirty()}
      type="submit"
      label={props.values.id ? 'Update Manager' : 'Create Manager'}
    />
    <Separator size="xs"/>
    <Button
      icon="clear"
      fullWidth
      disabled={props.submitting || !props.isDirty()}
      onClick={props.onReset}
      label="Discard Changes"
    />
  </form>
);

DistributorManagerForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

DistributorManagerForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onChange: () => false,
  onReset: () => false,
};

export default DistributorManagerForm;
