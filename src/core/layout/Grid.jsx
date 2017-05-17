import React from 'react';
import PropTypes from 'prop-types';

const Grid = props => (
  <div
    className={`mdl-grid ${props.noSpacing && 'mdl-grid--no-spacing'}`}
  >
    {props.children}
  </div>
);

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  noSpacing: PropTypes.bool,
};

Grid.defaultProps = {
  noSpacing: false,
};

export default Grid;
