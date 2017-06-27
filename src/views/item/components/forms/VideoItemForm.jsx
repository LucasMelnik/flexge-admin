import React from 'react';
import PropTypes from 'prop-types';
import VideoInputContainer from "../inputs/VideoInputContainer";

const VideoItemForm = props => (
  <div>
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
