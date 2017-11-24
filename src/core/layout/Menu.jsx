import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu as AntMenu } from 'antd';

export default class Menu extends Component {

  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
  };

  state = {
    current: '',
    openSubMenu: [],
  };

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  };

  handleOpenSubmenu = (e) => {
    this.setState({
      openSubMenu: [e[e.length - 1]],
    });
  };

  render() {
    return (
      <AntMenu
        theme="dark"
        mode="horizontal"
        onClick={this.handleClick}
        onOpenChange={this.handleOpenSubmenu}
        selectedKeys={[this.state.current]}
        openKeys={this.state.openSubMenu}
        triggerSubMenuAction="click"
        style={{
          display: 'inline-block',
          lineHeight: '64px',
        }}
      >
        {this.props.children}
      </AntMenu>
    );
  }
}
