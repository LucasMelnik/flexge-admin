import React from 'react';
import PropTypes from 'prop-types';

const Input = ({value, onChange, type}) => (
  <input value={value}
         onChange={onChange}
         type={type}/>
);

Input.defaultProps = {
  type: 'text'
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['text', 'number', 'password'])
};

export default Input;
