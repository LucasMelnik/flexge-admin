import React from 'react';
import PropTypes from 'prop-types';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import Switch from '../../../../core/form/Switch';

const TrueFalseAnswerInput = props => (
  <Row>
    <Column lgsize={12}>
      <Switch
        onChange={props.onChange}
        label="Is it true?"
        toggled={props.checked}
        labelPosition="right"
      />
    </Column>
  </Row>
);

TrueFalseAnswerInput.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TrueFalseAnswerInput;
