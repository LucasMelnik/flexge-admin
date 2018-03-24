import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import EvaluationPeriodList from './EvaluationPeriodList';
import EvaluationPeriodFormService from '../../services/EvaluationPeriodFormService';
import EvaluationPeriodListService from '../../services/EvaluationPeriodListService';

class EvaluationPeriodListContainer extends Component {

  static propTypes = {
    evaluationTemplateId: PropTypes.string.isRequired,
  };

  componentWillMount() {
    EvaluationPeriodListService.init(this.props.evaluationTemplateId);
  }

  render() {
    return (
      <EvaluationPeriodList
        periods={toJS(EvaluationPeriodListService.periods)}
        fetching={EvaluationPeriodListService.fetch.fetching}
        onDelete={EvaluationPeriodListService.handleRemove}
        onSyncGrades={EvaluationPeriodListService.handleSyncGrades}
        onEdit={EvaluationPeriodFormService.handleEdit}
      />
    );
  }
}

export default observer(EvaluationPeriodListContainer);
