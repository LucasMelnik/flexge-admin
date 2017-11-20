import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu as AntMenu } from 'antd';

export default class Menu extends Component {

  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
  };

  state = {
    current: '',
  };

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <AntMenu
        theme="dark"
        mode="horizontal"
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        triggerSubMenuAction="click"
        style={{ lineHeight: '64px' }}
      >
        {this.props.children}
      </AntMenu>
    );
  }
}
