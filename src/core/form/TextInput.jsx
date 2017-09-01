import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TextInput extends Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    type: PropTypes.oneOf(['text', 'password', 'number']),
    placeholder: PropTypes.string,
    description: PropTypes.string,
    disabled: PropTypes.bool,
    fieldType: PropTypes.oneOf(['textarea', 'static']),
    fieldValidation: PropTypes.oneOf(['error', 'warning', 'success']),
    helpText: PropTypes.string,
    textAreaRows: PropTypes.string,
    step: PropTypes.number,
    max: PropTypes.number,
  };

  static defaultProps = {
    description: null,
    onChange: null,
    onFocus: null,
    value: '',
    placeholder: null,
    type: 'text',
    disabled: false,
    fieldType: null,
    fieldValidation: null,
    helpText: null,
    max: null,
    step: null,
    textAreaRows: '2',
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
        <span
          className="desc"
          style={{
            color: 'red',
          }}
        >
          {this.props.description}
        </span>
        <div className="controls">
          {this.props.fieldType === 'textarea' ? (
            <textarea
              className="form-control autogrow"
              cols="5"
              rows={this.props.textAreaRows}
              disabled={this.props.disabled && 'disabled'}
              value={this.props.value}
              onChange={e => this.props.onChange && this.props.onChange(e.target.value)}
              placeholder={this.props.placeholder}
              style={{
                overflow: 'hidden',
                wordWrap: 'break-word',
                resize: 'none',
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
              type={this.props.type}
              value={this.props.value}
              onChange={e => this.props.onChange && this.props.onChange(e.target.value)}
              onFocus={this.props.onFocus}
              placeholder={this.props.placeholder}
              disabled={this.props.disabled && 'disabled'}
              step={this.props.step}
              max={this.props.max}
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
