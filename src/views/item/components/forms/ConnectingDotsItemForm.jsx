import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import AnswersContainer from '../inputs/AnswersInputContainer';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';

const ConnectingDotsItemForm = props => (
  <div>
    <Row>
      <Column size={12}>
        <TextInput
          label="Title"
          disabled={props.submitting || props.disabled}
          value={get(props.values, 'title', '')}
          onChange={value => props.onChange('title', value)}
          errorText={get(props.errors, 'title', '')}
        />
      </Column>
    </Row>
    <AnswersContainer
      label="Add Items"
      answerType="CORRECT"
      value={get(props.values, 'answers', [])}
      onChange={answers => props.onChange('answers', answers)}
      errorText={get(props.errors, 'answers', '')}
      disabled={props.submitting || props.disabled}
      allowSpellCheck
      hasPostPhrase
    />
  </div>
);

ConnectingDotsItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
};

ConnectingDotsItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  disabled: false,
};

export default ConnectingDotsItemForm;
