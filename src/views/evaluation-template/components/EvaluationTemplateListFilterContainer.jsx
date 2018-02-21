import React from 'react';
import { observer } from 'mobx-react';
import EvaluationTemplateListFilter from './EvaluationTemplateListFilter';
import EvaluationTemplateListService from '../services/EvaluationTemplateListService';

const EvaluationTemplateListFilterContainer = () => (
  <EvaluationTemplateListFilter
    values={EvaluationTemplateListService.filterForm.getValues()}
    onChange={EvaluationTemplateListService.filterForm.setValue}
    onSearch={EvaluationTemplateListService.load}
  />
);

export default observer(EvaluationTemplateListFilterContainer);
