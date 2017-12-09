import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextInput from '../../../core/form/TextInput';
import Button from '../../../core/form/Button';

const LoginForm = props => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      props.onSubmit();
    }}
  >
    <TextInput
      required
      label="Email"
      placeholder="Email"
      disabled={props.submitting}
      value={get(props.values, 'email', '')}
      onChange={value => props.onChange('email', value)}
      errorText={get(props.errors, 'email', '')}
    />
    <TextInput
      required
      type="password"
      label="Password"
      placeholder="Password"
      disabled={props.submitting}
      value={get(props.values, 'password', '')}
      onChange={value => props.onChange('password', value)}
      errorText={get(props.errors, 'password', '')}
    />
    <div
      style={{
        float: 'right',
        marginTop: 10,
      }}
    >
      <Button
        type="primary"
        label="Login"
        size="lg"
        icon="login"
        loading={props.submitting}
        buttonType="submit"
      />
    </div>
  </form>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
};

LoginForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
};

export default LoginForm;
