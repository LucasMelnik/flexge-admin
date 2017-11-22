import React from 'react';
import PropTypes from 'prop-types';
import { Menu as AntMenu } from 'antd';
import { Link } from 'react-router';
import PermissionValidator from './PermissionValidator';
import Icon from './Icon';

const MenuItem = props => (
  <PermissionValidator allowedFor={props.allowedFor}>
    <AntMenu.Item
      {...props}
      key={props.link}
    >
      <Link to={props.link}>
        <span>
          <span><Icon name={props.icon} /></span>
          {props.title}
        </span>
      </Link>
    </AntMenu.Item>
  </PermissionValidator>
);

MenuItem.propTypes = {
  allowedFor: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default MenuItem;
