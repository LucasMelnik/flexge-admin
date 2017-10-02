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
      this.props.children ? (
        <li className="dropdown">
          <Link
            to={this.props.link}
            className="dropdown-toggle"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className={this.props.icon} />
            <span className="title">
              {this.props.title}
            </span>
            <span className="caret" />
          </Link>
          {this.props.children}
        </li>
      ) : (
        <li>
          <Link to={this.props.link}>
            <i className={this.props.icon} />
            <span className="title">
            { this.props.title}
            </span>
          </Link>
        </li>
      )
    );
  }
}
