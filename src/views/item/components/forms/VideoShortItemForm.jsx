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
    />
    <Separator size="xs" />
    <VideoInputContainer
      onChange={props.onChange}
      errors={props.errors}
      values={props.values}
      submitting={props.submitting}
      requiredCut
    />
  </div>
);

VideoShortItemForm.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
};

VideoShortItemForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  onChange: () => false,
};

export default VideoShortItemForm;