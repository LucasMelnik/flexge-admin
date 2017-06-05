import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextInput from '../../../core/form/TextInput';
import Button from '../../../core/form/Button';
import Separator from '../../../core/layout/Separator';

const CompanyManagerForm = props => (
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
      error={get(props.errors, 'name', '')}
    />
    <TextInput
      floatingLabel
      fullWidth
      disabled={props.submitting}
      label="Manager Email"
      value={get(props.values, 'email', '')}
      onChange={value => props.onChange('email', value)}
      error={get(props.errors, 'email', '')}
    />
    <Separator size="xs" />
    <Button
      icon="done"
      primary
      fullWidth
      disabled={props.submitting || !props.isDirty()}
      type="submit"
      label={props.values.id ? 'Update Manager' : 'Create Manager'}
    />
  </form>
);

CompanyManagerForm.propTypes = {
  onSubmit: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

CompanyManagerForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onChange: () => false,
};

export default CompanyManagerForm;