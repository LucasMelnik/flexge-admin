import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

const Dialog = props => (
  <Modal
    visible={props.isOpen}
    title={props.title}
    footer={props.actions}
    onCancel={props.onCancel}
  >
    {props.children}
  </Modal>
);

Dialog.propTypes = {
  title: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
  children: PropTypes.node.isRequired,
  actions: PropTypes.arrayOf(PropTypes.node).isRequired,
  isOpen: PropTypes.bool,
};

Dialog.defaultProps = {
  isOpen: false,
  onCancel: null,
};

export default Dialog;
