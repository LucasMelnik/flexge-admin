import React from 'react';
import PropTypes from 'prop-types';
import YoutubeLink from './YoutubeLink';

const YoutubeLinkContainer = props => (
  <YoutubeLink
    values={props.values}
    errors={props.errors}
    onChange={props.onChange}
    submitting={props.submitting}
    requiredCut={props.requiredCut}
  />
);

YoutubeLinkContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  requiredCut: PropTypes.bool,
};

YoutubeLinkContainer.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  requiredCut: false,
};

export default YoutubeLinkContainer;