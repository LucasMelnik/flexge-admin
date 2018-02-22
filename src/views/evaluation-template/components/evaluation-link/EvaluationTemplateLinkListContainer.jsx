import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import EvaluationTemplateLinkList from './EvaluationTemplateLinkList';
import EvaluationTemplateLinkService from '../../services/EvaluationTemplateLinkService';

const EvaluationTemplateLinkListContainer = () => (
  <EvaluationTemplateLinkList
    schoolClasses={toJS(EvaluationTemplateLinkService.schoolClasses)}
    fetching={EvaluationTemplateLinkService.fetch.fetching}
    onChange={EvaluationTemplateLinkService.handleChange}
  />
);

export default observer(EvaluationTemplateLinkListContainer);
