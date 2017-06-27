import React from 'react';
import PropTypes from 'prop-types';
import Separator from "../../../../core/layout/Separator";
import VideoInputContainer from "../inputs/VideoInputContainer";
import TranslationInputContainer from "../inputs/TranslationInputContainer";

const VideoShortItemForm = props => (
  <div>
    <TranslationInputContainer
      onChange={props.onChange}
      errors={props.errors}
      values={props.values}
      submitting={props.submitting}
      disabled={props.disabled}
    />
    <Separator size="xs" />
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
};

VideoShortItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  onChange: () => false,
  disabled: false,
};

export default VideoShortItemForm;
