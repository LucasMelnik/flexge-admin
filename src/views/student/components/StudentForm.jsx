import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Card from '../../../core/layout/Card';
import TextInput from '../../../core/form/TextInput';
import Button from '../../../core/form/Button';
import Separator from '../../../core/layout/Separator';

const StudentForm = props => (
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
        label="Student Name"
        value={get(props.values, 'name', '')}
        onChange={value => props.onChange('name', value)}
        error={get(props.errors, 'name', '')}
      />
      <TextInput
        floatingLabel
        fullWidth
        disabled={props.submitting}
        label="Student Email"
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
        label={props.values.id ? 'Update Student' : 'Create Student'}
      />
      <Separator size="xs" />
      <Button
        icon="clear"
        fullWidth
        disabled={props.submitting}
        onClick={() => browserHistory.push('/students')}
        label="Cancel"
      />
    </form>
  </Card>
);

StudentForm.propTypes = {
  onSubmit: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

StudentForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onChange: () => false,
};

export default StudentForm;
