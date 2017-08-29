import React from 'react';
import PropTypes from 'prop-types';

const Menu = props => (
  <ul className="wraplist">
    {props.children}
  </ul>
);

Menu.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default Menu;
