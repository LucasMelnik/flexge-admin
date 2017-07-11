import React from 'react';
import PropTypes from 'prop-types';
import Block from 'jsxstyle/Block';
import Header from '../../../core/layout/Header';
import NotificationContainer from './NotificationContainer';
import ConfirmDialogContainer from './ConfirmDialogContainer';

const menuItems = [
  {
    label: 'Distributors',
    url: '/distributors',
    requiredRoles: ['ADMIN'],
  },
  {
    label: 'Companies',
    url: '/companies',
    requiredRoles: ['ADMIN', 'DISTRIBUTOR_MANAGER'],
  },
  {
    label: 'Teachers',
    url: '/teachers',
    requiredRoles: ['ADMIN', 'DISTRIBUTOR_MANAGER', 'COMPANY_MANAGER'],
  },
  {
    label: 'Schools',
    url: '/schools',
    requiredRoles: ['ADMIN', 'DISTRIBUTOR_MANAGER', 'COMPANY_MANAGER', 'SCHOOL_MANAGER'],
  },
  {
    label: 'Students',
    url: '/students',
    requiredRoles: ['ADMIN', 'DISTRIBUTOR_MANAGER', 'COMPANY_MANAGER'],
  },
  {
    label: 'Modules',
    url: '/modules',
    requiredRoles: ['ADMIN', 'CONTENT_ADMIN'],
  },
  {
    label: 'Review',
    url: '/reviews',
    requiredRoles: ['ADMIN', 'CONTENT_ADMIN'],
  },
];

const getTitle = (props) => {
  if (props.location.pathname === '/') {
    return 'Dashboard';
  }
  return menuItems.find(menuItem => props.location.pathname.indexOf(menuItem.url) > -1).label;
};

const MainScene = props => (
  <div>
    <Header
      title={getTitle(props)}
      menuItems={[
        {
          label: 'Dashboard',
          url: '/',
        },
        ...menuItems,
      ]}
    />
    <Block padding={15}>
      {props.children}
    </Block>
    <NotificationContainer />
    <ConfirmDialogContainer />
  </div>
);

MainScene.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainScene;
