import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Card from '../../../core/layout/Card';
import Separator from '../../../core/layout/Separator';
import TextInput from '../../../core/form/TextInput';
import Button from '../../../core/form/Button';

const LoginForm = props => (
  <Card
    style={{
      width: 300,
      textAlign: 'center',
      padding: 15,
    }}
  >
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit();
      }}
    >
      <TextInput
        floatingLabel
        fullWidth
        disabled={props.submitting}
        label="Email"
        value={get(props.values, 'email', '')}
        onChange={value => props.onChange('email', value)}
        error={get(props.errors, 'email', '') || (props.error && 'Verify the email')}
      />
      <Separator />
      <TextInput
        floatingLabel
        fullWidth
        disabled={props.submitting}
        label="Password"
        value={get(props.values, 'password', '')}
        onChange={value => props.onChange('password', value)}
        error={get(props.errors, 'password', '') || (props.error && 'Verify the password')}
        type="password"
      />
      <Separator />
      <Button
        fullWidth
        primary
        label="Login"
        type="submit"
      />
      <Separator />
      <Button
        primary={false}
        secondary={false}
        raised={false}
        disabled={props.submitting}
        label="Forgot password"
      />
    </form>
  </Card>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  error: PropTypes.string,
};

LoginForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  error: null,
};

export default LoginForm;
