import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TextInput extends Component {

  static propTypes = {
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'password']),
    placeholder: PropTypes.string,
    description: PropTypes.string,
    disabled: PropTypes.bool,
    fieldType: PropTypes.oneOf(['textarea', 'static']),
    fieldValidation: PropTypes.oneOf(['error', 'warning', 'success']),
    helpText: PropTypes.string,
  };

  static defaultProps = {
    id: null,
    description: null,
    placeholder: null,
    type: 'text',
    disabled: false,
    fieldType: null,
    fieldValidation: null,
    helpText: null,
  };

  render() {
    return (
      <div className={`form-group has-${this.props.fieldValidation}`}>
        <label
          className="form-label"
          htmlFor={this.props.id}
        >
          {this.props.label}
        </label>
        <span className="desc">
      {this.props.description}
    </span>
        <div className="controls">
          {this.props.fieldType === 'textarea' ? (
            <textarea
              className="form-control autogrow"
              cols="5"
              id={this.props.id}
              placeholder={this.props.placeholder}
              style={{
                overflow: 'hidden',
                wordWrap: 'break-word',
                resize: 'horizontal',
                height: 50,
              }}
            />
          ) : this.props.fieldType === 'static' ? (
            <p
              className="form-control-static"
            >
              {this.props.placeholder}
            </p>
          ) : (
            <input
              className="form-control"
              id={this.props.id}
              type={this.props.type}
              placeholder={this.props.placeholder}
              disabled={this.props.disabled && 'disabled'}
            />
          )}
          {this.props.helpText && (
            <span
              className="help-block"
            >
            {this.props.helpText}
        </span>
          )}
        </div>
      </div>
    );
  }
}
