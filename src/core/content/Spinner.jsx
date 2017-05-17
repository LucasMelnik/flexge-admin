import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';

const Spinner = props => (
  <div style={props.style}>
    <CircularProgress
      size={props.size}
      thickness={props.thickness}
    />
  </div>
);

Spinner.propTypes = {
  size: PropTypes.number,
  thickness: PropTypes.number,
  style: PropTypes.object,
};

Spinner.defaultProps = {
  size: 80,
  thickness: 5,
  style: null,
};

export default Spinner;
