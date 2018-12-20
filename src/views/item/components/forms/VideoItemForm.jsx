import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import VideoInputContainer from '../inputs/VideoInputContainer';
import TextInput from '../../../../core/form/TextInput';
import LegendInput from '../inputs/LegendInput';

const VideoItemForm = props => (
  <div>
    <TextInput
      label="Title"
      disabled={props.submitting || props.disabled}
      value={get(props.values, 'title', '')}
      onChange={value => props.onChange('title', value)}
      errorText={get(props.errors, 'title', '')}
    />
    <VideoInputContainer
      onChange={props.onChange}
      errors={props.errors}
      values={props.values}
      submitting={props.submitting}
      requiredCut
      disabled={props.disabled}
    />
    <LegendInput
      onChange={props.onChange}
      errors={props.errors}
      values={props.values}
      submitting={props.submitting}
      requiredCut
      disabled={props.disabled}
    />
  </div>
);

VideoItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool,
};

VideoItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  disabled: false,
};

export default VideoItemForm;
