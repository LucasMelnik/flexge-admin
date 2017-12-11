import React from 'react';
import { observer } from 'mobx-react';
import SchoolGradeConfigFilter from './SchoolGradeConfigFilter';
import SchoolGradeConfigFilterService from '../services/SchoolGradeConfigFilterService';

const SchoolGradeConfigFilterContainer = () => (
  <SchoolGradeConfigFilter
    value={SchoolGradeConfigFilterService.schoolId || ''}
    onChange={SchoolGradeConfigFilterService.handleFilterChange}
  />
);

export default observer(SchoolGradeConfigFilterContainer);
