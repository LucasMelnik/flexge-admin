import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Dialog extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    actions: PropTypes.arrayOf(PropTypes.node).isRequired,
    isOpen: PropTypes.bool,
  };

  static defaultProps = {
    isOpen: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen) {
      window.$(this.modal).modal('show', {
        backdrop: 'static',
      });
    } else {
      window.$(this.modal).modal('hide');
    }
  }

  render() {
    return (
      <div
        className="modal fade"
        role="dialog"
        ref={node => this.modal = node}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
            <div className="modal-footer">
              {this.props.actions}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
