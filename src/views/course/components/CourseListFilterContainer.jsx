import React from 'react';
import { observer } from 'mobx-react';
import CourseListService from '../services/CourseListService';
import CourseListFilter from './CourseListFilter';

const CourseListFilterContainer = () => (
  <CourseListFilter
    value={CourseListService.filter}
    onChange={CourseListService.handleFilterChange}
  />
);

export default observer(CourseListFilterContainer);
