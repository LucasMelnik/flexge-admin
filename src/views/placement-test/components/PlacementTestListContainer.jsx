import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import PlacementTestList from './PlacementTestList';
import PlacementTestListService from '../services/PlacementTestListService';

class PlacementTestListContainer extends Component {

  componentDidMount() {
    PlacementTestListService.init();
  }

  render() {
    return (
      <PlacementTestList
        placementTests={toJS(PlacementTestListService.placementTests)}
        fetching={PlacementTestListService.fetch.fetching}
        onDelete={PlacementTestListService.handleRemove}
      />
    );
  }
}

export default observer(PlacementTestListContainer);
