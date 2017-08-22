import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = props => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      props.onSubmit();
    }}
  >
    <p>
      <label htmlFor="user_login">
        Email
        <br />
        <input
          type="text"
          name="log"
          id="user_login"
          className="input"
          value={props.values.email || ''}
          size="20"
          onChange={e => props.onChange('email', e.target.value)}
        />
      </label>
    </p>
    <p>
      <label htmlFor="user_pass">
        Password
        <br />
        <input
          type="password"
          name="pwd"
          id="user_pass"
          className="input"
          value={props.values.password || ''}
          size="20"
          onChange={e => props.onChange('password', e.target.value)}
        />
      </label>
    </p>
    <p className="submit">
      <button
        type="submit"
        name="wp-submit"
        id="wp-submit"
        className="btn btn-accent btn-block"
      >
        {props.submitting ? <i className="fa fa-spinner fa-spin" /> : 'Sign in'}
      </button>
    </p>
    {props.error && (
      <div className="alert alert-danger">
        {props.error}
      </div>
    )}
  </form>
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
