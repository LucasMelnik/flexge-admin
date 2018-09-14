import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TranslationContainer from '../inputs/TranslationInputContainer';
import AnswersContainer from '../inputs/AnswersInputContainer';
import FileInput from '../../../../core/form/FileInput';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import SpellCheckInputContainer from '../inputs/SpellCheckInputContainer';
import Audios from '../inputs/Audios';

const DictationItemForm = props => (
  <div>
    <TranslationContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      errors={props.errors}
      disabled={props.disabled}
      isTestItem={props.isTestItem}
    />
    <SpellCheckInputContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      disabled={props.disabled}
    />
    <Row>
      <Column size={4}>
        <Audios
          values={props.values}
          submitting={props.submitting}
          disabled={props.disabled}
          onChange={props.onChange}
          errors={props.errors}
        />
      </Column>
      <Column size={6}>
        <FileInput
          label="Upload an audio to item"
          accept="audio"
          value={get(props.values, 'audio', '')}
          onChange={(key) => props.onChange('audio', key)}
          errorText={get(props.errors, 'audio', '')}
          disabled={props.disabled}
        />
      </Column>
    </Row>
    <AnswersContainer
      label="Add another possible answer"
      answerType="CORRECT"
      value={get(props.values, 'answers', [])}
      onChange={answers => props.onChange('answers', answers)}
      errorText={get(props.errors, 'answers', '')}
      disabled={props.disabled}
      allowSpellCheck
    />
  </div>
);

DictationItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
  isTestItem: PropTypes.bool,
};

DictationItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  disabled: false,
  isTestItem: false,
};

export default DictationItemForm;
