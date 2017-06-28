import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import PermissionValidator from '../content/PermissionValidator';

export default class Header extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    menuItems: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      requiredRoles: PropTypes.arrayOf(PropTypes.string),
    })),
  };

  static defaultProps = {
    menuItems: [],
  };

  state = { openMenu: false }

  toggleMenu = () => {
    this.setState({
      openMenu: !this.state.openMenu,
    });
  }

  handleCloseMenu = () => {
    this.setState({
      openMenu: false,
    });
  }

  render() {
    return (
      <div>
        <AppBar
          title={this.props.title}
          onLeftIconButtonTouchTap={() => this.toggleMenu()}
          iconElementRight={(
            <IconMenu
              iconButtonElement={(
                <IconButton
                  style={{ color: 'fff' }}
                  iconClassName="material-icons"
                >
                  more_vert
                </IconButton>
              )}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem
                primaryText="Sign out"
                onClick={() => {
                  localStorage.clear();
                  browserHistory.push('/');
                  window.location.reload();
                }}
              />
            </IconMenu>
          )}
        />
        <Drawer
          docked={false}
          open={this.state.openMenu}
          onRequestChange={this.handleCloseMenu}
        >
          {this.props.menuItems.map((menuItem) => {
            const menuItemComponent = (
              <MenuItem
                key={menuItem.url}
                onClick={() => {
                  this.toggleMenu();
                  browserHistory.push(menuItem.url);
                }}
                style={{ cursor: 'pointer' }}
              >
                {menuItem.label}
              </MenuItem>
            );
            return menuItem.requiredRoles ? (
              <PermissionValidator
                key={`validator-for-${menuItem.url}`}
                allowedFor={menuItem.requiredRoles}
              >
                {menuItemComponent}
              </PermissionValidator>
            ) : menuItemComponent;
          })}
        </Drawer>
      </div>
    );
  }
}
