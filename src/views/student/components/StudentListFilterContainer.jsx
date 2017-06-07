import React from 'react';
import { observer } from 'mobx-react';
import StudentListService from '../services/StudentListService';
import StudentListFilter from './StudentListFilter';

const StudentListFilterContainer = () => (
  <StudentListFilter
    value={StudentListService.filter}
    onChange={StudentListService.handleFilterChange}
  />
);

export default observer(StudentListFilterContainer);
