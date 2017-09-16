import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import './Switch.css';

export default class Switch extends Component {

  static propTypes = {
    value: PropTypes.bool,
    icons: PropTypes.bool,
    titleOn: PropTypes.string,
    titleOff: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    value: false,
    icons: false,
    titleOn: '',
    titleOff: '',
    disabled: false,
    onChange: () => null,
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
        }}
      >
        <span
          style={{
            marginRight: 10,
          }}
        >
          {this.props.titleOff}
        </span>
        <Toggle
          defaultChecked={this.props.value}
          icons={this.props.icons}
          onChange={event => this.props.onChange(event.target.checked)}
          disabled={this.props.disabled}
        />
        <span
          style={{
            marginLeft: 10,
          }}
        >
          {this.props.titleOn}
        </span>
      </div>
    );
  }
}
