import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import EvaluationPeriodForm from './EvaluationPeriodForm';
import EvaluationPeriodFormService from '../../services/EvaluationPeriodFormService';
import EvaluationPeriodListService from '../../services/EvaluationPeriodListService';

class EvaluationPeriodFormContainer extends Component {
  static propTypes = {
    evaluationTemplateId: PropTypes.string.isRequired,
  };

  componentWillMount() {
    EvaluationPeriodFormService.init(this.props.evaluationTemplateId);
  }

  render() {
    return (
      <EvaluationPeriodForm
        onSubmit={EvaluationPeriodFormService.handleSubmit}
        onChange={EvaluationPeriodFormService.form.setValue}
        onReset={EvaluationPeriodFormService.form.reset}
        values={EvaluationPeriodFormService.form.getValues()}
        errors={EvaluationPeriodFormService.form.errors}
        submitting={EvaluationPeriodFormService.submit.fetching}
        isDirty={EvaluationPeriodFormService.form.isDirty}
        allowSelectStart={!EvaluationPeriodListService.periods.length}
      />
    );
  }
}

export default observer(EvaluationPeriodFormContainer);
