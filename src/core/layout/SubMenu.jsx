import React from 'react';
import PropTypes from 'prop-types';
import { Menu as AntMenu } from 'antd';
import PermissionValidator from './PermissionValidator';
import Icon from './Icon';
import MenuItem from './MenuItem';

const MenuItemGroup = AntMenu.ItemGroup;

const SubMenu = props => (
  <PermissionValidator allowedFor={props.allowedFor}>
    <AntMenu.SubMenu
      {...props}
      title={<span><Icon name={props.icon} /><span>{props.title}</span></span>}
    >
      {props.groups ? props.groups.map(group => (
        <PermissionValidator
          allowedFor={group.allowedFor}
          key={group.group}
        >
          <MenuItemGroup
            {...props}
            title={group.group}
          >
            {props.items
              .filter(item => item.group === group.group)
              .map(item => (
                <MenuItem
                  key={item.link}
                  link={item.link}
                  title={item.label}
                  icon={item.icon}
                  allowedFor={item.allowedFor}
                />
              ))
            }
          </MenuItemGroup>
        </PermissionValidator>
      )) : props.items.map(item => (
        <MenuItem
          key={item.link}
          link={item.link}
          title={item.label}
          icon={item.icon}
          allowedFor={item.allowedFor}
        />
      ))}
    </AntMenu.SubMenu>
  </PermissionValidator>
);

SubMenu.propTypes = {
  allowedFor: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({
    group: PropTypes.string,
    allowedFor: PropTypes.arrayOf(PropTypes.string),
  })),
  items: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
};

SubMenu.defaultProps = {
  allowedFor: null,
  groups: null,
};

export default SubMenu;
