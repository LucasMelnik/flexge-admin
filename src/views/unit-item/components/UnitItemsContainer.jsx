import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock';
import SubTitle from '../../../core/content/SubTitle';
import Modal from "../../../core/layout/Modal";
import Separator from "../../../core/layout/Separator";
import Button from "../../../core/form/Button";
import FloatActionButton from "../../../core/form/FloatActionButton";
import ItemFormContainer from "../../item/components/ItemFormContainer";
import ItemFormService from "../../item/services/ItemFormService";
import ItemListContainer from "./UnitItemListContainer";
import UnitItemListService from "../services/UnitItemListService";
import UnitItemFormService from '../services/UnitItemFormService';

export default class UnitItemsContainer extends Component {

  static propTypes = {
    unitId: PropTypes.string.isRequired,
  };

  state = { modalFormOpen: false };

  componentWillMount() {
    UnitItemListService.init(this.props.unitId, this.handleSelect);

    const linkUnitCallback = () => {
      this.toggleModal();
      UnitItemListService.load();
    };
    UnitItemFormService.init(linkUnitCallback);

    const saveItemCallback = (item, isNew) => {
      if (isNew) {
        const unitItem = {
          unit: this.props.unitId,
          item: item.id,
          order: UnitItemListService.total + 1,
        };
        UnitItemFormService.handleLinkToUnit(unitItem);
      } else {
        this.toggleModal();
      }
    };
    ItemFormService.init(saveItemCallback);
  }

  toggleModal = () => {
    this.setState({
      modalFormOpen: !this.state.modalFormOpen,
    });
  };

  handleSelect = (unitItem) => {
    ItemFormService.handleLoad(unitItem.item.id);
    UnitItemFormService.handleLoad(unitItem.id);
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