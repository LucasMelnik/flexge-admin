import React from 'react';
import { observer } from 'mobx-react';
import CompanyManagerListService from '../services/CompanyManagerListService';
import CompanyManagerListPagination from './CompanyManagerListPagination';

const CompanyManagerListPaginationContainer = () => (
  <CompanyManagerListPagination
    pageCount={CompanyManagerListService.pageCount}
    onPageChange={CompanyManagerListService.handlePageChange}
    pageRangeDisplayed={2}
    marginPagesDisplayed={2}
  />
);

export default observer(CompanyManagerListPaginationContainer);
