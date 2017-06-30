import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
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
    <Row>
      <Column lgSize={4}>
        <TextInput
          floatingLabel
          fullWidth
          disabled={props.submitting}
          label="Manager Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          errorText={get(props.errors, 'name', '')}
        />
      </Column>
      <Column lgSize={4}>
        <TextInput
          floatingLabel
          fullWidth
          disabled={props.submitting}
          label="Manager Email"
          value={get(props.values, 'email', '')}
          onChange={value => props.onChange('email', value)}
          errorText={get(props.errors, 'email', '')}
        />
      </Column>
      <Column lgSize={4}>
        <TextInput
          floatingLabel
          fullWidth
          disabled={props.submitting}
          type="password"
          label="Manager Password"
          value={get(props.values, 'password', '')}
          onChange={value => props.onChange('password', value)}
          errorText={get(props.errors, 'password', '')}
        />
      </Column>
      <Separator size="xs" />
      <Button
        icon="done"
        secondary
        fullWidth
        disabled={props.submitting || !props.isDirty()}
        type="submit"
        label={props.values.id ? 'Update Manager' : 'Create Manager'}
      />
    </Row>
    <Separator size="xs" />
    <Button
      icon="done"
      fullWidth
      onClick={props.onReset}
      disabled={props.submitting || !props.isDirty()}
      label="Discard Changes"
    />
  </form>
);

CompanyManagerForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
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
  onReset: () => false,
};

export default CompanyManagerForm;
