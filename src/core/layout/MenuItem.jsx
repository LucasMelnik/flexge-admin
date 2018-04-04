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
          {props.icon && (
            <span><Icon name={props.icon} /></span>
          )}
          {props.title}
        </span>
      </Link>
    </AntMenu.Item>
  </PermissionValidator>
);

MenuItem.propTypes = {
  allowedFor: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  icon: PropTypes.string,
  link: PropTypes.string.isRequired,
};

MenuItem.defaultProps = {
  allowedFor: null,
  icon: null,
};

export default MenuItem;
