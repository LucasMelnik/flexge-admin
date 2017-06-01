import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Paper from '../../../core/layout/Paper';
import TextInput from '../../../core/form/TextInput';
import Select from '../../../core/form/Select';
import Button from '../../../core/form/Button';
import Separator from '../../../core/layout/Separator';

const SchoolForm = props => (
  <Paper>
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
        label="School Name"
        value={get(props.values, 'name', '')}
        onChange={value => props.onChange('name', value)}
        error={get(props.errors, 'name', '')}
      />
      <Separator size="xs" />
      <Select
        fullWidth
        disabled={props.submitting}
        label="Company"
        value={get(props.values, 'company.id', '')}
        onChange={value => props.onChange('company.id', value)}
        error={get(props.errors, 'company.id', '')}
        options={[
          {
            label: 'Bertoni',
            value: 1,
          },
          {
            label: 'UDC',
            value: 2,
          },
          {
            label: 'Uniamérica',
            value: 3,
          },
        ]}
      />
      <Separator size="xs" />
      <Button
        icon="done"
        colored
        fullWidth
        disabled={props.submitting || !props.isDirty()}
        type="submit"
        label={props.values.id ? 'Update School' : 'Create School'}
      />
      <Separator size="xs" />
      <Button
        icon="clear"
        fullWidth
        disabled={props.submitting}
        onClick={() => browserHistory.push('/companies')}
        label="Cancel"
      />
    </form>
  </Paper>
);

SchoolForm.propTypes = {
  onSubmit: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

SchoolForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onChange: () => false,
};

export default SchoolForm;
