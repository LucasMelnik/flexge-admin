import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TranslationInputContainer from '../inputs/TranslationInputContainer';
import FileInput from '../../../../core/form/FileInput';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import AudioPreview from '../../../../core/layout/AudioPreview';

const SpeechPracticeItemForm = props => (
  <div>
    <TranslationInputContainer
      onChange={props.onChange}
      submitting={props.submitting}
      values={props.values}
      errors={props.errors}
      disabled={props.disabled}
      isTestItem={props.isTestItem}
    />
    <Row>
      {get(props.values, 'generatedAudio', null) && (
        <Column size={2}>
          <p>Generated Audio</p>
          <AudioPreview src={get(props.values, 'generatedAudio', '')} />
        </Column>
      )}
      <Column size={6}>
        <FileInput
          accept="audio"
          value={get(props.values, 'audio', '')}
          onChange={(key) => props.onChange('audio', key)}
          errorText={get(props.errors, 'audio', '')}
          disabled={props.disabled}
        />
      </Column>
    </Row>
  </div>
);

SpeechPracticeItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
  isTestItem: PropTypes.bool,
};

SpeechPracticeItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  disabled: false,
  isTestItem: false,
};

export default SpeechPracticeItemForm;
