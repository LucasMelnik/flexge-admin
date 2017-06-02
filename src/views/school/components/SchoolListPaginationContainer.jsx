import React from 'react';
import { observer } from 'mobx-react';
import SchoolListService from '../services/SchoolListService';
import SchoolListPagination from './SchoolListPagination';

const SchoolListPaginationContainer = () => (
  <SchoolListPagination
    pageCount={SchoolListService.pageCount}
    onPageChange={SchoolListService.handlePageChange}
    pageRangeDisplayed={2}
    marginPagesDisplayed={2}
  />
);

export default observer(SchoolListPaginationContainer);
