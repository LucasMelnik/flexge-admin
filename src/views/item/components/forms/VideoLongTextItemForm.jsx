import React from 'react';
import PropTypes from 'prop-types';
import VideoInputContainer from "../inputs/VideoInputContainer";

const VideoLongTextItemForm = props => (
  <div>
    <VideoInputContainer
      onChange={props.onChange}
      errors={props.errors}
      values={props.values}
      submitting={props.submitting}
      requiredCut
    />
    <span>slcie to remove na vertical</span>
  </div>
);

VideoLongTextItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
};

VideoLongTextItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  onChange: () => false,
};

export default VideoLongTextItemForm;