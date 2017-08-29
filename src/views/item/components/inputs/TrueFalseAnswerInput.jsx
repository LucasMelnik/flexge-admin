import React from 'react';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import Switch from '../../../../core/form/Switch';

const TrueFalseAnswerInput = props => (
  <Row>
    <Column lgsize={12}>
      <InlineBlock verticalAlign="middle">
        False
      </InlineBlock>
      <InlineBlock verticalAlign="middle">
        <Switch
          label=""
          onChange={props.onChange}
          value={props.checked}
          disabled={props.disabled}
        />
      </InlineBlock>
      <InlineBlock verticalAlign="middle" marginLeft={5}>
        True
      </InlineBlock>
    </Column>
  </Row>
);

TrueFalseAnswerInput.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TrueFalseAnswerInput;
