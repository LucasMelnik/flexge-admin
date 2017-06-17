import React from 'react';
import PropTypes from 'prop-types';
import VideoInput from './VideoInput';

const VideoInputContainer = props => (
  <VideoInput
    values={props.values}
    errors={props.errors}
    onChange={props.onChange}
    submitting={props.submitting}
    requiredCut={props.requiredCut}
  />
);

VideoInputContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  requiredCut: PropTypes.bool,
};

VideoInputContainer.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  requiredCut: false,
};

export default VideoInputContainer;