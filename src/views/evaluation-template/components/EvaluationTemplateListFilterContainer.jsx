import React, { Component } from 'react';
import { observer } from 'mobx-react';
import EvaluationTemplateListFilter from './EvaluationTemplateListFilter';
import EvaluationTemplateListService from '../services/EvaluationTemplateListService';

class EvaluationTemplateListFilterContainer extends Component {
  componentWillMount() {
    EvaluationTemplateListService.init();
  }

  render() {
    return (
      <EvaluationTemplateListFilter
        values={EvaluationTemplateListService.filterForm.getValues()}
        onChange={EvaluationTemplateListService.filterForm.setValue}
        onSearch={EvaluationTemplateListService.load}
      />
    );
  }
}

export default observer(EvaluationTemplateListFilterContainer);
