import React from 'react';
import PropTypes from 'prop-types';

const SubMenu = props => (
  <ul className="sub-menu">
    {props.items.map(items => (
      <li>
        <a
          className=""
          href={items.link}
        >
          {items.label}
        </a>
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
