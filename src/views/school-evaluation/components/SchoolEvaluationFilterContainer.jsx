import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import SchoolEvaluationFilter from './SchoolEvaluationFilter';
import SchoolEvaluationListService from '../services/SchoolEvaluationListService';

const SchoolEvaluationFilterContainer = () => (
  <SchoolEvaluationFilter
    value={SchoolEvaluationListService.selectedYear}
    years={toJS(SchoolEvaluationListService.years)}
    onFilter={SchoolEvaluationListService.handleSelectYear}
  />
);

export default observer(SchoolEvaluationFilterContainer);
