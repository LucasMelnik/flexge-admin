import React from 'react';
import PropTypes from 'prop-types';
import Block from 'jsxstyle/Block';
import Header from '../../../core/layout/Header';
import NotificationContainer from './NotificationContainer';

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
          label: 'Companies',
          url: '/companies',
        },
        {
          label: 'Schools',
          url: '/schools',
        },
        {
          label: 'Students',
          url: '/students',
        },
      ]}
    />
    <Block padding={15}>
      {props.children}
    </Block>
    <NotificationContainer />
  </div>
);

MainScene.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainScene;
