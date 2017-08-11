import React from 'react';
import LoginFormContainer from './LoginFormContainer';

const LoginScene = () => (
  <div className="login_page">
    <div className="container-fluid">
      <div className="login-wrapper row">
        <div id="login" className="login loginpage col-lg-offset-4 col-md-offset-3 col-sm-offset-3 col-xs-offset-0 col-xs-12 col-sm-6 col-lg-4">
          <h1 style={{ color: '#fff', textAlign: 'center' }}>
            English Learning Admin
          </h1>
          <LoginFormContainer />
          <p id="nav">
            <a className="pull-left" title="Password Lost and Found">Forgot password?</a>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default LoginScene;
