import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import VideoInputContainer from '../inputs/VideoInputContainer';
import TranslationInputContainer from '../inputs/TranslationInputContainer';
import TextInput from '../../../../core/form/TextInput';

const VideoShortItemForm = props => (
  <div>
    <TextInput
      label="Title"
      disabled={props.submitting || props.disabled}
      value={get(props.values, 'title', '')}
      onChange={value => props.onChange('title', value)}
      errorText={get(props.errors, 'title', '')}
    />
    <TranslationInputContainer
      onChange={props.onChange}
      errors={props.errors}
      values={props.values}
      submitting={props.submitting}
      disabled={props.disabled}
      isTestItem={props.isTestItem}
    />
    <VideoInputContainer
      onChange={props.onChange}
      errors={props.errors}
      values={props.values}
      submitting={props.submitting}
      requiredCut
      disabled={props.disabled}
    />
  </div>
);

VideoShortItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
  isTestItem: PropTypes.bool,
};

VideoShortItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  disabled: false,
  isTestItem: false,
};

export default VideoShortItemForm;
