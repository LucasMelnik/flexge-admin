import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import EvaluationTemplateLinkList from './EvaluationTemplateLinkList';
import EvaluationTemplateLinkService from '../../services/EvaluationTemplateLinkService';

const EvaluationTemplateLinkListContainer = () => (
  <EvaluationTemplateLinkList
    schoolClasses={toJS(EvaluationTemplateLinkService.schoolClasses)}
    pagination={toJS(EvaluationTemplateLinkService.pagination)}
    fetching={EvaluationTemplateLinkService.fetch.fetching}
    onChange={EvaluationTemplateLinkService.handleChange}
    onChangePage={EvaluationTemplateLinkService.load}
  />
);

export default observer(EvaluationTemplateLinkListContainer);
