import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import ItemFormScene from './ItemFormScene';
import LoadUnitService from '../../../services/LoadUnitService';
import UnitItemListService from '../../../services/UnitItemListService';
import SendUnitToReviewService from '../../../../unit-review/services/ContentReviewService';

class UnitItemsSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      moduleId: PropTypes.string.isRequired,
      unitId: PropTypes.string.isRequired,
      itemId: PropTypes.string,
      reviewId: PropTypes.string,
    }).isRequired,
  };

  loadUnitService = new LoadUnitService();
  sendUnitToReviewService = new SendUnitToReviewService();

  componentWillMount() {
    this.loadUnitService.handleLoad(this.props.params.moduleId, this.props.params.unitId);
    this.sendUnitToReviewService.handleLoad(this.props.params.reviewId);
  }

  handleBack = () => {
    if (this.props.params.reviewId) {
      browserHistory.push(`/modules/${this.props.params.moduleId}/units/${this.props.params.unitId}/reviews/${this.props.params.reviewId}`)
    } else {
      browserHistory.push(`/modules/${this.props.params.moduleId}/units/${this.props.params.unitId}/items`)
    }
  };

  render() {
    return (
      <ItemFormScene
        unit={this.loadUnitService.unit}
        itemId={this.props.params.itemId}
        reviewId={this.props.params.reviewId}
        itemOrder={UnitItemListService.items.length + 1}
        onBack={this.handleBack}
      />
    );
  }
}

export default observer(UnitItemsSceneContainer);
