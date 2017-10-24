import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import RegionList from './RegionList';
import RegionListService from '../services/RegionListService';

class RegionListContainer extends Component {

  componentDidMount() {
    RegionListService.init();
  }

  render() {
    return (
      <RegionList
        regions={toJS(RegionListService.regions)}
        fetching={RegionListService.fetch.fetching}
        onDelete={RegionListService.handleRemove}
      />
    );
  }
}

export default observer(RegionListContainer);
