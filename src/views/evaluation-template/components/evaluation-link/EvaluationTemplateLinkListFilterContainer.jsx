import React, { Component } from 'react';
import { observer } from 'mobx-react';
import EvaluationTemplateLinkService from '../../services/EvaluationTemplateLinkService';
import EvaluationTemplateLinkListFilter from './EvaluationTemplateLinkListFilter';

class EvaluationTemplateLinkListFilterContainer extends Component {
  componentWillMount() {
    EvaluationTemplateLinkService.init();
  }

  render() {
    return (
      <EvaluationTemplateLinkListFilter
        values={EvaluationTemplateLinkService.filterForm.getValues()}
        onChange={EvaluationTemplateLinkService.filterForm.setValue}
        onSearch={EvaluationTemplateLinkService.load}
      />
    );
  }
}

export default observer(EvaluationTemplateLinkListFilterContainer);
