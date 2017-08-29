import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import VideoInputContainer from '../inputs/VideoInputContainer';
import Separator from '../../../../core/layout/Separator';
import FileInput from '../../../../core/form/FileInput';
import TextInput from '../../../../core/form/TextInput';

const VideoItemForm = props => (
  <div>
    <TextInput
      label="Title"
      disabled={props.submitting || props.disabled}
      value={get(props.values, 'title', '')}
      onChange={value => props.onChange('title', value)}
      description={get(props.errors, 'title', '')}
      fieldValidation={get(props.errors, 'title', null) && 'error'}
    />
    <VideoInputContainer
      onChange={props.onChange}
      errors={props.errors}
      values={props.values}
      submitting={props.submitting}
      requiredCut
      disabled={props.disabled}
    />
    <Separator size="xs" />
    <FileInput
      label="Upload a video to the item"
      accept="video"
      disabled={props.disabled}
      value={get(props.values, 'video', '')}
      onChange={(key) => props.onChange('video', key)}
      errorText={get(props.errors, 'video', '')}
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
  onChange: () => false,
  disabled: false,
};

export default VideoItemForm;
