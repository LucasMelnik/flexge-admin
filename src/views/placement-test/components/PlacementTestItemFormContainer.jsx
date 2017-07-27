import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import PlacementTestItemListService from '../services/PlacementTestItemListService';
import PlacementTestFormService from '../services/PlacementTestFormService';
import ItemFormContainer from '../../item/components/ItemFormContainer';

class PlacementTestItemFormContainer extends Component {

  static propTypes = {
    placementTestId: PropTypes.string.isRequired,
    onSaveSuccess: PropTypes.func.isRequired,
  };

  componentWillMount() {
    PlacementTestFormService.handleLoad(this.props.placementTestId);
  }

  render() {
    return (
      <ItemFormContainer
        itemsTypeUrl="/item-types?query[allowedForPlacementTest]=true"
        endpointUrl={`grammar-placement-test-levels/${this.props.placementTestId}/items`}
        onSaveSuccess={this.props.onSaveSuccess}
        order={PlacementTestItemListService.items.length + 1}
        defaultGrammar={PlacementTestFormService.form.getValue('grammar')}
      />
    );
  }
}

export default observer(PlacementTestItemFormContainer);
