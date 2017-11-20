import React from 'react';
import PropTypes from 'prop-types';
import { Menu as AntMenu } from 'antd';
import { Link } from 'react-router';
import PermissionValidator from './PermissionValidator';

const MenuItem = props => (
  <PermissionValidator allowedFor={props.allowedFor}>
    <AntMenu.Item
      {...props}
      key={props.link}
    >
      <Link to={props.link}>
        {props.title}
      </Link>
    </AntMenu.Item>
  </PermissionValidator>
);

MenuItem.propTypes = {
  allowedFor: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default MenuItem;
