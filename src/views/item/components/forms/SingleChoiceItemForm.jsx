import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Separator from "../../../../core/layout/Separator";
import AnswersInputContainer from "../inputs/AnswersInputContainer";
import TranslationInputContainer from "../inputs/TranslationInputContainer";

const SingleChoiceItemForm = props => (
  <div>
    <TranslationInputContainer
      onChange={props.onChange}
      errors={props.errors}
      values={props.values}
      submitting={props.submitting}
    />
    <Separator size="xs" />
    <AnswersInputContainer
      value={get(props.values, 'answers', '')}
      onChange={answers => props.onChange('answers', answers)}
      errorText={get(props.errors, 'answers', '')}
    />
  </div>
);

SingleChoiceItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
};

SingleChoiceItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  onChange: () => false,
};

export default SingleChoiceItemForm;