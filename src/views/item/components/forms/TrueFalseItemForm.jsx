import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Separator from '../../../../core/layout/Separator';
import TranslationInputContainer from '../inputs/TranslationInputContainer';
import TrueFalseAnswerInputContainer from '../inputs/TrueFalseAnswerInputContainer';
import AudioPreview from '../../../../core/layout/AudioPreview';

const TrueFalseItemForm = props => (
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
    <TrueFalseAnswerInputContainer
      value={get(props.values, 'answers', [])}
      onChange={answers => props.onChange('answers', answers)}
      disabled={props.disabled}
    />
  </div>
);

TrueFalseItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
  isTestItem: PropTypes.bool,
};

TrueFalseItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  onChange: () => false,
  disabled: false,
  isTestItem: false,
};

export default TrueFalseItemForm;
