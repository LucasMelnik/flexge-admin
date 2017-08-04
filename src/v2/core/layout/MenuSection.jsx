import React from 'react';
import PropTypes from 'prop-types';

const MenuSection = props => (
  <li className="menusection">
    {props.children}
  </li>
);

MenuSection.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MenuSection;
