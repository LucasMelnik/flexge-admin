import React from 'react';
import PropTypes from 'prop-types';

const SubMenu = props => (
  <ul className="sub-menu">
    {props.items.map(item => (
      <li key={item.link}>
        <a
          className=""
          href={item.link}
        >
          {item.label}
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
