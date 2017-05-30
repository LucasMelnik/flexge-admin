import React from 'react';
import { observer } from 'mobx-react';
import CompanyListService from '../services/CompanyListService';
import CompanyListPagination from './CompanyListPagination';

const CompanyListPaginationContainer = () => (
  <CompanyListPagination
    pageCount={CompanyListService.pageCount}
    onPageChange={CompanyListService.handlePageChange}
    pageRangeDisplayed={2}
    marginPagesDisplayed={2}
  />
);

export default observer(CompanyListPaginationContainer);
