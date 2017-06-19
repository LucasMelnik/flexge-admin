import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../../core/layout/Modal';
import ItemFormContainer from '../../../../item/components/ItemFormContainer';
import Separator from '../../../../../core/layout/Separator';
import Button from '../../../../../core/form/Button';

const ItemFormModal = props => (
  <Modal
    title="Item"
    isOpen={props.isOpen}
    width="90%"
  >
    <ItemFormContainer />
    <Separator size="xs" />
    <Button
      fullWidth
      label="Close"
      icon="arrow_back"
      onClick={props.onClose}
    />
  </Modal>
);

ItemFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ItemFormModal;
