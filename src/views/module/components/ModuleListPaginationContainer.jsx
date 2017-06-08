import React from 'react';
import { observer } from 'mobx-react';
import ModuleListService from '../services/ModuleListService';
import ModuleListPagination from './ModuleListPagination';

const ModuleListPaginationContainer = () => (
  <ModuleListPagination
    pageCount={ModuleListService.pageCount}
    onPageChange={ModuleListService.handlePageChange}
    pageRangeDisplayed={2}
    marginPagesDisplayed={2}
  />
);

export default observer(ModuleListPaginationContainer);
