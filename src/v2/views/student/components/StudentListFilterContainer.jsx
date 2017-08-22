import React from 'react';
import PropTypes from 'prop-types';
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
