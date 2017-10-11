import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const SubMenu = props => (
  <ul className="dropdown-menu">
    {props.items.map(item => (
      <li key={`sub-menu-${item.link}`}>
        <Link to={item.link}>
          {item.label}
        </Link>
      </li>
    ))}
  </ul>
);

SubMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
};

export default SubMenu;
