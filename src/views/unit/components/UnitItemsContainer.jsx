import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock';
import SubTitle from '../../../core/content/SubTitle';
import Modal from "../../../core/layout/Modal";
import FloatActionButton from "../../../core/form/FloatActionButton";
import ItemListContainer from "../../item/components/ItemListContainer";
import ItemFormContainer from "../../item/components/ItemFormContainer";
import ItemListService from "../../item/services/ItemListService";
import ItemFormService from "../../item/services/ItemFormService";
import Button from "../../../core/form/Button";
import Separator from "../../../core/layout/Separator";

export default class UnitItemsContainer extends Component {

  static propTypes = {
    unitId: PropTypes.string.isRequired,
    moduleId: PropTypes.string.isRequired,
  };

  state = { modalFormOpen: false };

  componentWillMount() {
    ItemListService.init(`/modules/${this.props.moduleId}/units/${this.props.unitId}/items`, this.handleSelect);
    ItemFormService.init(() => {
      this.toggleModal();
      ItemListService.load();
    });
  }

  toggleModal = () => {
    this.setState({
      modalFormOpen: !this.state.modalFormOpen,
    });
  };

  handleSelect = (item) => {
    ItemFormService.handleLoad(item.id);
    setTimeout(() => { this.toggleModal(); }, 100);
  };

  handleAddClick = () => {
    ItemFormService.handleLoad();
    this.toggleModal();
  };

  render() {
    return (
      <div>
        <InlineBlock>
          <SubTitle>Unit Items</SubTitle>
        </InlineBlock>
        <FloatActionButton
          secondary
          icon="add"
          style={{ position: 'relative',
            float: 'right',
            top: 20,
            right: 20,
          }}
          onClick={() => this.handleAddClick()}
        />
        <ItemListContainer />
        <Modal
          title="Item"
          isOpen={this.state.modalFormOpen}
          width="90%"
        >
          <ItemFormContainer />
          <Separator size="xs" />
          <Button
            fullWidth
            label="Close"
            icon="arrow_back"
            onClick={() => this.toggleModal()}
          />
        </Modal>
      </div>
    );
  }
}