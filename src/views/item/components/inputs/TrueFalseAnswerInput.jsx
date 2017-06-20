import React from 'react';
import PropTypes from 'prop-types';
import Flex from 'jsxstyle/Flex';
import Switch from '../../../../core/form/Switch';

const TrueFalseAnswerInput = props => (
  <Flex
    alignItems="center"
  >
    <label>False</label>
    <Switch
      onChange={props.onChange}
      label=""
      toggled={props.checked}
      labelPosition="right"
      style={{
        width: 45,
        paddingLeft: 5,
      }}
    />
    <label>True</label>
  </Flex>
);

TrueFalseAnswerInput.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TrueFalseAnswerInput;
