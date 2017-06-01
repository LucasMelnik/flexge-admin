import React from 'react';
import { observer } from 'mobx-react';
import StudentListService from '../services/StudentListService';
import StudentListPagination from './StudentListPagination';

const StudentListPaginationContainer = () => (
  <StudentListPagination
    pageCount={StudentListService.pageCount}
    onPageChange={StudentListService.handlePageChange}
    pageRangeDisplayed={2}
    marginPagesDisplayed={2}
  />
);

export default observer(StudentListPaginationContainer);
