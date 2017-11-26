import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import SchoolEvaluationList from './SchoolEvaluationList';
import SchoolEvaluationListService from '../services/SchoolEvaluationListService';

const SchoolEvaluationListContainer = () => (
  <SchoolEvaluationList
    evaluations={toJS(SchoolEvaluationListService.evaluationsByYear)}
    onDelete={SchoolEvaluationListService.handleRemove}
  />
);

export default observer(SchoolEvaluationListContainer);
