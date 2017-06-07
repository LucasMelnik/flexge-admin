import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextInput from '../../../core/form/TextInput';
import Button from '../../../core/form/Button';

const TeacherForm = props => (
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
      label="Teacher Name"
      value={get(props.values, 'name', '')}
      onChange={value => props.onChange('name', value)}
      error={get(props.errors, 'name', '')}
    />
    <Button
      icon="done"
      colored
      fullWidth
      disabled={props.submitting || !props.isDirty()}
      type="submit"
      label={props.values.id ? 'Update Teacher' : 'Create Teacher'}
    />
  </form>
);

TeacherForm.propTypes = {
  onSubmit: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

TeacherForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onChange: () => false,
};

export default TeacherForm;
