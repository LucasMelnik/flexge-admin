import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

export default class MenuItem extends Component {

  static propTypes = {
    children: PropTypes.node,
    icon: PropTypes.string,
    title: PropTypes.string,
    link: PropTypes.string,
  };

  static defaultProps = {
    children: null,
    icon: null,
    title: null,
    link: null,
  };

  render() {
    return (
      <li className="">
        <Link to={this.props.link}>
          <i className={this.props.icon} />
          <span className="title">
            {this.props.title}
          </span>
          {this.props.children && (
            <span className="arrow" />
          )}
        </Link>
        {this.props.children}
      </li>
    );
  }
}
