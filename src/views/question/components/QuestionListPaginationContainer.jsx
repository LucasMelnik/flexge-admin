import React from 'react';
import { observer } from 'mobx-react';
import QuestionListService from '../services/QuestionListService';
import QuestionListPagination from './QuestionListPagination';

const QuestionListPaginationContainer = () => (
  <QuestionListPagination
    pageCount={QuestionListService.pageCount}
    onPageChange={QuestionListService.handlePageChange}
    pageRangeDisplayed={2}
    marginPagesDisplayed={2}
  />
);

export default observer(QuestionListPaginationContainer);
