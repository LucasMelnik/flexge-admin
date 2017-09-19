import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import PlacementTestItemsList from './PlacementTestItemsList';
import PlacementTestItemsListService from '../services/PlacementTestItemsListService';

class PlacementTestItemsListContainer extends Component {

  componentDidMount() {
    PlacementTestItemsListService.init();
  }

  render() {
    return (
      <PlacementTestItemsList
        items={toJS(PlacementTestItemsListService.items)}
        fetching={PlacementTestItemsListService.fetch.fetching}
      />
    );
  }
}

export default observer(PlacementTestItemsListContainer);
