import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import DistributorList from './DistributorList';
import DistributorListService from '../services/DistributorListService';

class DistributorListContainer extends Component {

  componentDidMount() {
    DistributorListService.init();
  }

  render() {
    return (
      <DistributorList
        distributors={toJS(DistributorListService.distributors)}
        fetching={DistributorListService.fetch.fetching}
        onDelete={DistributorListService.handleRemove}
      />
    );
  }
}

export default observer(DistributorListContainer);
