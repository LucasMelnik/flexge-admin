import React from 'react';
import { observer } from 'mobx-react';
import TeacherListService from '../services/TeacherListService';
import TeacherListFilter from './TeacherListFilter';

const TeacherListFilterContainer = () => (
  <TeacherListFilter
    value={TeacherListService.filter}
    onChange={TeacherListService.handleFilterChange}
  />
);

export default observer(TeacherListFilterContainer);
