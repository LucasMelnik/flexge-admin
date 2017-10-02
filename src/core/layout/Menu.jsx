import React from 'react';
import PropTypes from 'prop-types';

const Menu = props => (
  <nav
    className="navbar navbar-default navbar-fixed-top"
    style={{
      top: 60,
    }}
  >
    <div className="container-fluid">
      <ul className="nav navbar-nav">
        {props.children}
      </ul>
    </div>
  </nav>
);

Menu.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default Menu;
