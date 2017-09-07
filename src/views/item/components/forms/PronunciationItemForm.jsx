import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TranslationInputContainer from '../inputs/TranslationInputContainer';
import AudioPreview from '../../../../core/layout/AudioPreview';

const PronunciationItemForm = props => (
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
  </div>
);

PronunciationItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
  isTestItem: PropTypes.bool,
};

PronunciationItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  onChange: () => false,
  disabled: false,
  isTestItem: false,
};

export default PronunciationItemForm;
