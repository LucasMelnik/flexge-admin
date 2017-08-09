import React, { Component } from 'react';
import PropTypes from 'prop-types';

const TextInput = props => (
  <div className={`form-group has-${props.fieldValidation}`}>
    <label
      className="form-label"
      htmlFor={props.id}
    >
      {props.label}
    </label>
    <span className="desc">
      {props.description}
    </span>
    <div className="controls">
      {props.fieldType === 'textarea' ? (
        <textarea
          className="form-control autogrow"
          cols="5"
          id={props.id}
          value={props.value}
          placeholder={props.placeholder}
          style={{
            overflow: 'hidden',
            wordWrap: 'break-word',
            resize: 'horizontal',
            height: 50,
          }}
        />
      ) : props.fieldType === 'static' ? (
        <p
          className="form-control-static"
        >
          {props.placeholder}
        </p>
      ) : (
        <input
          className="form-control"
          id={props.id}
          type={props.type}
          value={props.value}
          onChange={e => props.onChange && props.onChange(e.target.value)}
          placeholder={props.placeholder}
          disabled={props.disabled && 'disabled'}
        />
      )}
      {props.helpText && (
        <span
          className="help-block"
        >
            {props.helpText}
        </span>
      )}
    </div>
  </div>
);

TextInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['text', 'password']),
  placeholder: PropTypes.string,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  fieldType: PropTypes.oneOf(['textarea', 'static']),
  fieldValidation: PropTypes.oneOf(['error', 'warning', 'success']),
  helpText: PropTypes.string,
};

TextInput.defaultProps = {
  id: null,
  description: null,
  onChange: null,
  value: '',
  placeholder: null,
  type: 'text',
  disabled: false,
  fieldType: null,
  fieldValidation: null,
  helpText: null,
};
