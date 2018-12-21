import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import EvaluationPeriodForm from './EvaluationPeriodForm';
import EvaluationPeriodFormService from '../../services/EvaluationPeriodFormService';

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
        values={EvaluationPeriodFormService.form.getValues()}
        errors={EvaluationPeriodFormService.form.errors}
        submitting={EvaluationPeriodFormService.submit.fetching}
        isDirty={EvaluationPeriodFormService.form.isDirty}
      />
    );
  }
}

export default observer(EvaluationPeriodFormContainer);
