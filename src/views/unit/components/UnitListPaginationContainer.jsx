import React from 'react';
import { observer } from 'mobx-react';
import UnitListService from '../services/UnitListService';
import UnitListPagination from './UnitListPagination';

const UnitListPaginationContainer = () => (
  <UnitListPagination
    pageCount={UnitListService.pageCount}
    onPageChange={UnitListService.handlePageChange}
    pageRangeDisplayed={2}
    marginPagesDisplayed={2}
  />
);

export default observer(UnitListPaginationContainer);
