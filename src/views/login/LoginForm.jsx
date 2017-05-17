import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../core/layout/Card';
import Separator from '../../core/layout/Separator';
import TextInput from '../../core/form/TextInput';
import Button from '../../core/form/Button';

const LoginForm = props => (
  <Card
    style={{
      width: 300,
      textAlign: 'center',
      padding: 15,
    }}
  >
    <TextInput
      label="Username"
    />
    <Separator />
    <TextInput
      label="Password"
      type="password"
    />
    <Separator />
    <Button
      fullWidth
      primary
      label="Login"
      onClick={props.onSubmit}
    />
    <Separator />
    <Button
      primary={false}
      secondary={false}
      raised={false}
      label="Forgot password"
    />
  </Card>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
