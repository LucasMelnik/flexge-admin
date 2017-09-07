import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Separator from "../../../../core/layout/Separator";
import TranslationInputContainer from '../inputs/TranslationInputContainer';
import AnswersInputContainer from "../inputs/AnswersInputContainer";
import SlicesInputContainer from "../inputs/SlicesInputContainer";
import AudioPreview from '../../../../core/layout/AudioPreview';

const UnscrambleDragDropItemForm = props => (
  <div>
    <TranslationInputContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      errors={props.errors}
      disabled={props.disabled}
      isTestItem={props.isTestItem}
    />
    {get(props.values, 'generatedAudio', null) && (
      <div>
        <p>Generated Audio</p>
        <AudioPreview src={get(props.values, 'generatedAudio', '')} />
      </div>
    )}
    <Separator size="xs" />
    <SlicesInputContainer
      onChange={(answers) => {
        props.onChange('answers', answers);
        props.onChange('indexesToRemove', answers.filter(slice => slice.index !== undefined)); //this is to show errors
      }}
      text={get(props.values, 'text', '')}
      value={get(props.values, 'answers', [])}
      errorText={get(props.errors, 'indexesToRemove', '')}
      allowLinkSlices
      disabled={props.disabled}
    />
    <Separator size="xs" />
    <AnswersInputContainer
      answerType="WRONG"
      value={get(props.values, 'answers', [])}
      onChange={answers => props.onChange('answers', answers)}
      errorText={get(props.errors, 'answers', '')}
      disabled={props.disabled}
    />
  </div>
);

UnscrambleDragDropItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
  isTestItem: PropTypes.bool,
};

UnscrambleDragDropItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  onChange: () => false,
  disabled: false,
  isTestItem: false,
};

export default UnscrambleDragDropItemForm;
