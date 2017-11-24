import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import DistributorListService from '../services/DistributorListService';
import DistributorUserListScene from './DistributorUserListScene';

class DistributorUserListSceneContainer extends Component {

  componentDidMount() {
    DistributorListService.load();
  }

  render() {
    return (
      <DistributorUserListScene
        distributors={toJS(DistributorListService.filteredDistributors)}
        fetching={DistributorListService.fetch.fetching}
      />
    );
  }
}

export default observer(DistributorUserListSceneContainer);
