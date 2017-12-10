import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import SchoolEvaluationFilter from './SchoolEvaluationFilter';
import SchoolEvaluationListService from '../services/SchoolEvaluationListService';

const SchoolEvaluationFilterContainer = () => (
  <SchoolEvaluationFilter
    values={SchoolEvaluationListService.filterForm.getValues()}
    errors={SchoolEvaluationListService.filterForm.errors}
    onChange={SchoolEvaluationListService.filterForm.setValue}
    onFilter={SchoolEvaluationListService.onSearch}
    years={toJS(SchoolEvaluationListService.years)}
  />
);

export default observer(SchoolEvaluationFilterContainer);
