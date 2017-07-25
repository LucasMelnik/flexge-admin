import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import PlacementTestItemListService from '../services/PlacementTestItemListService';
import ItemFormContainer from '../../item/components/ItemFormContainer';

class PlacementTestItemFormContainer extends Component {

  static propTypes = {
    placementTestId: PropTypes.string.isRequired,
    onSaveSuccess: PropTypes.func.isRequired,
  };

  render() {
    return (
      <ItemFormContainer
        itemsTypeUrl="/item-types?allowedForPlacementTest=true"
        endpointUrl={`grammar-placement-test-levels/${this.props.placementTestId}/items`}
        onSaveSuccess={this.props.onSaveSuccess}
        order={PlacementTestItemListService.items.length + 1}
      />
    );
  }
}

export default observer(PlacementTestItemFormContainer);
