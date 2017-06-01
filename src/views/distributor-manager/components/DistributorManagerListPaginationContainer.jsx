import React from 'react';
import { observer } from 'mobx-react';
import DistributorManagerListService from '../services/DistributorManagerListService';
import DistributorManagerListPagination from './DistributorManagerListPagination';

const DistributorManagerListPaginationContainer = () => (
  <DistributorManagerListPagination
    pageCount={DistributorManagerListService.pageCount}
    onPageChange={DistributorManagerListService.handlePageChange}
    pageRangeDisplayed={2}
    marginPagesDisplayed={2}
  />
);

export default observer(DistributorManagerListPaginationContainer);
