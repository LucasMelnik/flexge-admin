import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Snackbar from 'material-ui/Snackbar';

class Notification extends Component {
  static propTypes = {
    notification: PropTypes.shape({
      message: PropTypes.string,
      action: PropTypes.string,
      onClick: PropTypes.func,
      type: PropTypes.oneOf(['success', 'warning', 'danger']),
    }),
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    notification: null,
  };

  render() {
    return (
      <Snackbar
        open={this.props.isOpen}
        message={this.props.notification.message || ''}
        autoHideDuration={5000}
        onRequestClose={this.props.onClose}
        action={this.props.notification.action}
        onActionTouchTap={this.props.notification.onClick}
        bodyStyle={{
          backgroundColor: ({
            success: '#2E7D32',
            warning: '#FFEB3B',
            danger: '#E53935',
          }[this.props.notification.type]),
        }}
      />
    );
  }
}

export default observer(Notification);
