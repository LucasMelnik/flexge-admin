import React from 'react';
import PropTypes from 'prop-types';
import { Menu as AntMenu } from 'antd';
import { Link } from 'react-router';
import PermissionValidator from './PermissionValidator';

const SubMenu = props => (
  <PermissionValidator allowedFor={props.allowedFor}>
    <AntMenu.SubMenu
      {...props}
      title={<span>{props.title}</span>}
    >
      {props.items.map(item => (
        <AntMenu.Item key={item.link}>
          <Link to={item.link}>
            {item.label}
          </Link>
        </AntMenu.Item>
      ))}
    </AntMenu.SubMenu>
  </PermissionValidator>
);

SubMenu.propTypes = {
  allowedFor: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
};

export default SubMenu;
