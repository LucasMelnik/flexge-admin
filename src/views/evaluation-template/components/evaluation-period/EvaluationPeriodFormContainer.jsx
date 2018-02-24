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

  evaluationPeriodFormService = new EvaluationPeriodFormService();
  componentWillMount() {
    this.evaluationPeriodFormService.init(this.props.evaluationTemplateId);
  }

  render() {
    return (
      <EvaluationPeriodForm
        onSubmit={this.evaluationPeriodFormService.handleSubmit}
        onChange={this.evaluationPeriodFormService.form.setValue}
        onReset={this.evaluationPeriodFormService.form.reset}
        values={this.evaluationPeriodFormService.form.getValues()}
        errors={this.evaluationPeriodFormService.form.errors}
        submitting={this.evaluationPeriodFormService.submit.fetching}
        isDirty={this.evaluationPeriodFormService.form.isDirty}
        allowSelectStart={!EvaluationPeriodListService.periods.length}
      />
    );
  }
}

export default observer(EvaluationPeriodFormContainer);
