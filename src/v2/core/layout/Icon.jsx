import React from 'react';
import PropTypes from 'prop-types';

const Icon = props => (
  <i className={`fa ${props.name}`} />
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
