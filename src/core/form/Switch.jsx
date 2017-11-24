import React from 'react';
import PropTypes from 'prop-types';
import { Switch as AntSwitch, Form } from 'antd';

const Switch = props => (
  <Form.Item
    label={props.label}
    help={props.errorText}
    validateStatus={props.errorText && 'error'}
  >
    <AntSwitch
      checked={props.value}
      disabled={props.disabled}
      onChange={props.onChange}
      checkedChildren={props.titleOn}
      unCheckedChildren={props.titleOff}
    />
  </Form.Item>
);

Switch.propTypes = {
  label: PropTypes.string.isRequired,
  errorText: PropTypes.string,
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  titleOn: PropTypes.string,
  titleOff: PropTypes.string,
  onChange: PropTypes.func,
};

Switch.defaultProps = {
  value: false,
  titleOn: '',
  titleOff: '',
  errorText: null,
  disabled: false,
  onChange: () => null,
};

export default Switch;
