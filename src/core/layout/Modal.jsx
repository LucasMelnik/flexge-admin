import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';

const Modal = props => (
  <Dialog
    title={props.title}
    open={props.isOpen}
    contentStyle={{
      width: props.width,
    }}
    titleStyle={{
      padding: '14px 14px 10px',
    }}
    autoScrollBodyContent
    modal
  >
    {props.children}
  </Dialog>
);

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  width: PropTypes.number,
};

Modal.defaultProps = {
  width: 400,
};

export default Modal;
