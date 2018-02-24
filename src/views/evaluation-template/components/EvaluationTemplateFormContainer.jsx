import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import EvaluationTemplateForm from './EvaluationTemplateForm';
import EvaluationTemplateFormService from '../services/EvaluationTemplateFormService';

class EvaluationTemplateFormContainer extends Component {
  static propTypes = {
    evaluationTemplateId: PropTypes.string,
  };

  static defaultProps = {
    evaluationTemplateId: null,
  };

  evaluationTemplateFormService = new EvaluationTemplateFormService();
  componentWillMount() {
    this.evaluationTemplateFormService.handleLoad(this.props.evaluationTemplateId);
  }

  render() {
    return (
      <EvaluationTemplateForm
        onSubmit={this.evaluationTemplateFormService.handleSubmit}
        onChange={this.evaluationTemplateFormService.form.setValue}
        onReset={this.evaluationTemplateFormService.form.reset}
        values={this.evaluationTemplateFormService.form.getValues()}
        errors={this.evaluationTemplateFormService.form.errors}
        submitting={
          this.evaluationTemplateFormService.submit.fetching ||
          this.evaluationTemplateFormService.fetch.fetching
        }
        isDirty={this.evaluationTemplateFormService.form.isDirty}
      />
    );
  }
}

export default observer(EvaluationTemplateFormContainer);
