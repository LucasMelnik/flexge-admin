import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Switch extends Component {

  static propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func,
    size: PropTypes.oneOf(['small', 'default']),
  };

  static defaultProps = {
    value: false,
    onChange: () => null,
    size: 'small',
  };

  componentDidMount() {
    this.switch = new window.Switchery(this.input, {
      disabled: this.props.disabled,
      disabledOpacity: 0.5,
      size: this.props.size,
    });

    if (this.props.onChange) {
      this.input.onchange = (event) => {
        this.props.onChange(event.target.checked)
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.disabled) {
      this.switch.disable();
    } else {
      this.switch.enable();
    }
  };

  render() {
    return (
      <input
        type="checkbox"
        ref={input => this.input = input}
        checked={this.props.value}
      />
    );
  }
}
