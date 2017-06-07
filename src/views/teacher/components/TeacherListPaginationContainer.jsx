import React from 'react';
import { observer } from 'mobx-react';
import TeacherListService from '../services/TeacherListService';
import TeacherListPagination from './TeacherListPagination';

const TeacherListPaginationContainer = () => (
  <TeacherListPagination
    pageCount={TeacherListService.pageCount}
    onPageChange={TeacherListService.handlePageChange}
    pageRangeDisplayed={2}
    marginPagesDisplayed={2}
  />
);

export default observer(TeacherListPaginationContainer);
