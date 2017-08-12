import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Separator from "../../../../core/layout/Separator";
import AnswersInputContainer from "../inputs/AnswersInputContainer";
import TranslationInputContainer from "../inputs/TranslationInputContainer";
import TextInput from '../../../../core/form/TextInput';

const SingleChoiceItemForm = props => (
  <div>
    <TranslationInputContainer
      onChange={props.onChange}
      errors={props.errors}
      values={props.values}
      submitting={props.submitting}
      disabled={props.disabled}
      isTestItem={props.isTestItem}
    />
    {props.showPostPhrase && (
      <Separator size="xs" />
    )}
    {props.showPostPhrase && (
      <TextInput
        label="Post Phrase"
        disabled={props.submitting}
        value={get(props.values, 'postPhrase', '')}
        onChange={value => props.onChange('postPhrase', value)}
        description={get(props.errors, 'postPhrase', '')}
        fieldValidation={get(props.errors, 'postPhrase', null) && 'error'}
      />
    )}
    <Separator size="xs" />
    <AnswersInputContainer
      value={get(props.values, 'answers', [])}
      onChange={answers => props.onChange('answers', answers)}
      errorText={get(props.errors, 'answers', '')}
      disabled={props.disabled}
    />
  </div>
);

SingleChoiceItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
  isTestItem: PropTypes.bool,
  showPostPhrase: PropTypes.bool,
};

SingleChoiceItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  onChange: () => false,
  disabled: false,
  isTestItem: false,
};

export default SingleChoiceItemForm;
