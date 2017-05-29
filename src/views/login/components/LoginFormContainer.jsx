import React, { Component } from 'react';
import { observer } from 'mobx-react';
import LoginForm from './LoginForm';
import LoginService from '../services/LoginService';

class LoginFormContainer extends Component {
  loginService = new LoginService();

  render() {
    return (
      <LoginForm
        onSubmit={this.loginService.handleLogin}
        onChange={this.loginService.form.setValue}
        values={this.loginService.form.getValues()}
        errors={this.loginService.form.errors}
        submitting={this.loginService.fetch.fetching}
        error={this.loginService.fetch.error}
      />
    );
  }
}

export default observer(LoginFormContainer);
