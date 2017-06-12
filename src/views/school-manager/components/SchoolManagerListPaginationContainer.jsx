import React from 'react';
import { observer } from 'mobx-react';
import SchoolManagerListService from '../services/SchoolManagerListService';
import SchoolManagerListPagination from './SchoolManagerListPagination';

const SchoolManagerListPaginationContainer = () => (
  <SchoolManagerListPagination
    pageCount={SchoolManagerListService.pageCount}
    onPageChange={SchoolManagerListService.handlePageChange}
    pageRangeDisplayed={2}
    marginPagesDisplayed={2}
  />
);

export default observer(SchoolManagerListPaginationContainer);
