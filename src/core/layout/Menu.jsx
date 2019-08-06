import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Menu as AntMenu } from 'antd';
import { Link } from 'react-router';
import Icon from './Icon';
import WhitelabelService from '../services/WhitelabelService';

class Menu extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = {
    current: [''],
    openSubMenu: [],
  };

  handleClick = (key) => {
    this.setState({
      current: key.keyPath,
    });
  };

  handleOpenSubmenu = (e) => {
    this.setState({
      openSubMenu: [e[e.length - 1]],
    });
  };

  renderMenuItem = props => (!props.allowedFor || props.allowedFor.find(role => role === localStorage.role)) && (
    <AntMenu.Item
      {...props}
      key={props.key}
    >
      <Link to={props.link}>
        <span>
          {props.icon && (
            <span><Icon name={props.icon} /></span>
          )}
          {props.title || props.label}
        </span>
      </Link>
    </AntMenu.Item>
  );

  renderSubMenu = props => (!props.allowedFor || props.allowedFor.find(role => role === localStorage.role)) && (
    <AntMenu.SubMenu
      {...props}
      title={<span><Icon name={props.icon} /><span>{props.title}</span></span>}
      key={props.key}
    >
      {props.groups ? props.groups.filter(group => !group.allowedFor || group.allowedFor.find(role => role === localStorage.role)).map(group => (
        <AntMenu.ItemGroup
          title={group.group}
        >
          {props.items
            .filter(item => item.group === group.group)
            .map(item => this.renderMenuItem(item))
          }
        </AntMenu.ItemGroup>
      )) : props.items.map(item => this.renderMenuItem(item))}
    </AntMenu.SubMenu>
  );

  render() {
    return (
      <AntMenu
        theme="dark"
        mode="horizontal"
        onClick={this.handleClick}
        onOpenChange={this.handleOpenSubmenu}
        selectedKeys={this.state.current}
        openKeys={this.state.openSubMenu}
        triggerSubMenuAction="click"
        style={{
          display: 'inline-block',
          lineHeight: '64px',
        }}
      >
        {this.props.items.filter(item => !item.removeWhenWhitelabel || (item.removeWhenWhitelabel && !WhitelabelService.isWhitelabelDistribution))
          .map((item) => {
          if (item.type === 'menu') {
            return this.renderMenuItem(item);
          }
          if (item.type === 'submenu') {
            return this.renderSubMenu(item);
          }
          return null;
        })}
      </AntMenu>
    );
  }
}

export default observer(Menu);
