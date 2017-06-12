import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import DistributorManagerList from './DistributorManagerList';
import DistributorManagerListService from '../services/DistributorManagerListService';

const DistributorManagerListContainer = props => (
  <DistributorManagerList
    managers={toJS(DistributorManagerListService.managers)}
    fetching={DistributorManagerListService.fetch.fetching}
    onRowClick={props.onRowClick}
    onDelete={DistributorManagerListService.handleDelete}
  />
);

export default observer(DistributorManagerListContainer);
