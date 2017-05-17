import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../core/layout/Header';

const MainScene = props => (
  <div>
    <Header
      title="Admin App"
      menuItems={[
        {
          label: 'Dashboard',
          url: '/',
        },
        {
          label: 'Users',
          url: '/users',
        },
        {
          label: 'Schools',
          url: '/schools',
        },
      ]}
    />
    {props.children}
  </div>
);

MainScene.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainScene;
