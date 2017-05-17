import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class Header extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    menuItems: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
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

  render() {
    return (
      <div>
        <AppBar
          title={this.props.title}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={() => this.toggleMenu()}
        />
        <Drawer open={this.state.openMenu}>
          {this.props.menuItems.map(menuItem => (
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
          ))}
        </Drawer>
      </div>
    );
  }
}
