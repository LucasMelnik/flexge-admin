import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import LoginForm from './LoginForm';

export default class LoginFormContainer extends Component {
  handleSubmit = () => {
    localStorage.setItem('token', 'a token');
    browserHistory.push('/');
  }

  render() {
    return (
      <LoginForm
        onSubmit={this.handleSubmit}
      />
    );
  }
}
