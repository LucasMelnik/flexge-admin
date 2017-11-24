import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

const Dialog = props => (
  <Modal
    visible={props.isOpen}
    title={props.title}
    footer={props.actions}
  >
    {props.children}
  </Modal>
);

Dialog.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  actions: PropTypes.arrayOf(PropTypes.node).isRequired,
  isOpen: PropTypes.bool,
};

Dialog.defaultProps = {
  isOpen: false,
};

export default Dialog;
