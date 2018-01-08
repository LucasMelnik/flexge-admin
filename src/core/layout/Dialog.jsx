import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

const Dialog = props => (
  <Modal
    visible={props.isOpen}
    title={props.title}
    footer={props.actions}
    onCancel={props.onCancel}
    width={props.width}
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
  width: PropTypes.string,
};

Dialog.defaultProps = {
  isOpen: false,
  onCancel: null,
  width: 600,
};

export default Dialog;
