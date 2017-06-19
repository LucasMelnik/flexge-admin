import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Separator from "../../../../core/layout/Separator";
import TranslationContainer from '../inputs/TranslationInputContainer';
import AnswersInputContainer from "../inputs/AnswersInputContainer";
import SlicesInputContainer from "../inputs/SlicesInputContainer";

const GapFillMultipleItemForm = props => (
  <div>
    <TranslationContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      errors={props.errors}
    />
    <Separator size="xs" />
    <SlicesInputContainer
      onChange={(answers) => {
        props.onChange('answers', answers);
        props.onChange('indexesToRemove', answers); //this is to show errors
      }}
      text={get(props.values, 'text', '')}
      value={get(props.values, 'answers', [])}
      errorText={get(props.errors, 'indexesToRemove', '')}
    />
    <Separator size="xs" />
    <AnswersInputContainer
      answerType="WRONG"
      value={get(props.values, 'answers', [])}
      onChange={answers => props.onChange('answers', answers)}
      errorText={get(props.errors, 'answers', '')}
    />
  </div>
);

GapFillMultipleItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
};

GapFillMultipleItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  onChange: () => false,
};

export default GapFillMultipleItemForm;
