import React from 'react';
import { observer } from 'mobx-react';
import SchoolClassListService from '../services/SchoolClassListService';
import SchoolClassListPagination from './SchoolClassListPagination';

const SchoolClassListPaginationContainer = () => (
  <SchoolClassListPagination
    pageCount={SchoolClassListService.pageCount}
    onPageChange={SchoolClassListService.handlePageChange}
    pageRangeDisplayed={2}
    marginPagesDisplayed={2}
  />
);

export default observer(SchoolClassListPaginationContainer);
