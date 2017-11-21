import React from 'react';
import PropTypes from 'prop-types';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import Switch from '../../../../core/form/Switch';

const TrueFalseAnswerInput = props => (
  <Row>
    <Column lgsize={12}>
      <Switch
        label=""
        titleOff="False"
        titleOn="True"
        onChange={props.onChange}
        value={props.checked}
        disabled={props.disabled}
      />
    </Column>
  </Row>
);

TrueFalseAnswerInput.propTypes = {
  disabled: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TrueFalseAnswerInput;
