import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MenuItem extends Component {

  static propTypes = {
    children: PropTypes.node,
    icon: PropTypes.string,
    title: PropTypes.string,
  };

  static defaultProps = {
    children: null,
    icon: null,
    title: null,
  };

  render() {
    return (
      <li className="">
        <a>
          <i className={this.props.icon} />
          <span className="title">
            {this.props.title}
          </span>
          {this.props.children && (
            <span className="arrow" />
          )}
        </a>
        {this.props.children}
      </li>
    );
  }
}
