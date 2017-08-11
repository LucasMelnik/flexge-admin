import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import PlacementTestItemList from './PlacementTestItemList';
import PlacementTestItemListService from '../services/PlacementTestItemListService';

class PlacementTestItemListContainer extends Component {

  static propTypes = {
    placementTestId: PropTypes.string.isRequired,
  };

  componentWillMount() {
    PlacementTestItemListService.init(this.props.placementTestId)
  }

  render() {
    return (
      <PlacementTestItemList
        items={toJS(PlacementTestItemListService.items)}
        fetching={PlacementTestItemListService.fetch.fetching}
        onDelete={PlacementTestItemListService.handleUnlinkItem}
        onOrderChange={PlacementTestItemListService.handleOrderChange}
      />
    );
  }
}

export default observer(PlacementTestItemListContainer);
