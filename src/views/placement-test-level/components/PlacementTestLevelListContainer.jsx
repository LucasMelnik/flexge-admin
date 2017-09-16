import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import PlacementTestLevelList from './PlacementTestLevelList';
import PlacementTestLevelListService from '../services/PlacementTestLevelListService';

class PlacementTestLevelListContainer extends Component {

  componentDidMount() {
    PlacementTestLevelListService.init();
  }

  render() {
    return (
      <PlacementTestLevelList
        levels={toJS(PlacementTestLevelListService.levels)}
        fetching={PlacementTestLevelListService.fetch.fetching}
        onDelete={PlacementTestLevelListService.handleRemove}
      />
    );
  }
}

export default observer(PlacementTestLevelListContainer);
