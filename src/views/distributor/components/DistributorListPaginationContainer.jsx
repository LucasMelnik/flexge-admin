import React from 'react';
import { observer } from 'mobx-react';
import DistributorListService from '../services/DistributorListService';
import DistributorListPagination from './DistributorListPagination';

const DistributorListPaginationContainer = () => (
  <DistributorListPagination
    pageCount={DistributorListService.pageCount}
    onPageChange={DistributorListService.handlePageChange}
    pageRangeDisplayed={2}
    marginPagesDisplayed={2}
  />
);

export default observer(DistributorListPaginationContainer);
