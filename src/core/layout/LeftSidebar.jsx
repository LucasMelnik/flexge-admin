import React from 'react';
import PropTypes from 'prop-types';

const LeftSidebar = props => (
  <div className="page-container row-fluid">
    <div className="page-sidebar ">
      <div className="page-sidebar-wrapper" id="main-menu-wrapper">
        <div className="profile-info row">
          {' '}
        </div>
        {props.children}
      </div>
      <div className="project-info">
        <div className="block1">
          English Learning
        </div>
        <div className="block2">
          2017
        </div>
      </div>
    </div>
  </div>
);

LeftSidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LeftSidebar;
