import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TranslationInputContainer from '../inputs/TranslationInputContainer';
import AnswersInputContainer from '../inputs/AnswersInputContainer';
import SlicesInputContainer from '../inputs/SlicesInputContainer';
import Audios from '../inputs/Audios';
import Column from '../../../../core/layout/Column';
import TextInput from '../../../../core/form/TextInput';
import Row from '../../../../core/layout/Row';

const UnscrambleDragDropItemForm = props => (
  <div>
    <Row>
      <Column size={12}>
        <TextInput
          required
          label="Text"
          fieldType="textarea"
          disabled={props.submitting || props.disabled}
          value={get(props.values, 'text', '')}
          onChange={value => props.onChange('text', value)}
          errorText={get(props.errors, 'text', '')}
        />
      </Column>
    </Row>
    {!props.isTestItem && (
      <TranslationInputContainer
        onChange={props.onChange}
        submitting={props.submitting}
        values={props.values}
        errors={props.errors}
        disabled={props.disabled}
      />
    )}
    <Audios
      audioPath="audio"
      generatedAudioPath="generatedAudio"
      values={props.values}
      submitting={props.submitting}
      disabled={props.disabled}
      onChange={props.onChange}
      errors={props.errors}
    />
    <SlicesInputContainer
      onChange={(answers) => {
        props.onChange('answers', answers);
        props.onChange('indexesToRemove', answers.filter(slice => slice.index !== undefined)); // this is to show errors
      }}
      text={get(props.values, 'text', '')}
      value={get(props.values, 'answers', [])}
      errorText={get(props.errors, 'indexesToRemove', '')}
      allowLinkSlices
      disabled={props.disabled}
    />
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
  disabled: false,
  isTestItem: false,
};

export default UnscrambleDragDropItemForm;
