import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import EvaluationTemplateList from './EvaluationTemplateList';
import EvaluationTemplateListService from '../services/EvaluationTemplateListService';

const EvaluationTemplateListContainer = () => (
  <EvaluationTemplateList
    templates={toJS(EvaluationTemplateListService.templates)}
    fetching={EvaluationTemplateListService.fetch.fetching}
    onDelete={EvaluationTemplateListService.handleRemove}
  />
);

export default observer(EvaluationTemplateListContainer);
