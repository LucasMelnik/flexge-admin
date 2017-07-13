import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ItemFormContainer from '../../item/components/ItemFormContainer';
import UnitItemFormService from '../../module/services/UnitItemFormService';
import LoadUnitService from '../../module/services/LoadUnitService';
import UnitItemListService from '../../module/services/UnitItemListService';
import SendUnitToReviewService from '../../unit-review/services/SendUnitToReviewService';

class ReviewItemFormContainer extends Component {

  static propTypes = {
    moduleId: PropTypes.string.isRequired,
    unitId: PropTypes.string.isRequired,
    itemId: PropTypes.string,
    reviewId: PropTypes.string,
    backToList: PropTypes.func.isRequired,
  };

  static defaultProps = {
    itemId: null,
    reviewId: null,
  }

  loadUnitService = new LoadUnitService();

  sendUnitToReviewService = new SendUnitToReviewService();

  componentWillMount() {
    UnitItemFormService.init(this.handleBack);
    this.loadUnitService.handleLoad(this.props.moduleId, this.props.unitId);
    this.sendUnitToReviewService.handleLoad(this.props.reviewId);
  }

  saveItemCallback = (item, isNew) => {
    if (isNew) {
      const unitItem = {
        unit: this.props.unitId,
        item: item.id,
        order: UnitItemListService.items.length + 1,
      };
      UnitItemFormService.handleLinkToUnit(unitItem);
    } else if (!this.props.reviewId) {
      // If its review dont go back to the list
      this.props.backToList();
    }
  };

  render() {
    return (
      <div>
        {this.loadUnitService.unit.id && (
          <ItemFormContainer
            itemId={this.props.itemId}
            itemsTypeUrl={`unit-types/${this.loadUnitService.unit.type.id}/item-types`}
            showPostPhrase={this.loadUnitService.unit.type.name.toLowerCase() === 'vocabulary'}
            saveItemCallback={this.saveItemCallback}
          />
        )}
      </div>

    );
  }
}

export default observer(ReviewItemFormContainer);
