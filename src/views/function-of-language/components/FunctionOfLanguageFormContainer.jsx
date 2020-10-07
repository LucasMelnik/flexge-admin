import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import FunctionOfLanguageForm from './FunctionOfLanguageForm';
import FunctionOfLanguageFormService from '../services/FunctionOfLanguageFormService';

class FunctionOfLanguageFormContainer extends Component {

  static propTypes = {
    functionId: PropTypes.string,
  };

  static defaultProps = {
    functionId: null,
  };

  functionOfLanguageFormService = new FunctionOfLanguageFormService();

  componentWillMount() {
    this.functionOfLanguageFormService.handleLoad(this.props.functionId);
  }

  render() {
    return (
      <FunctionOfLanguageForm
        onSubmit={this.functionOfLanguageFormService.handleSubmit}
        onChange={this.functionOfLanguageFormService.form.setValue}
        onReset={this.functionOfLanguageFormService.form.reset}
        values={this.functionOfLanguageFormService.form.getValues()}
        errors={this.functionOfLanguageFormService.form.errors}
        submitting={this.functionOfLanguageFormService.submit.fetching}
        isDirty={this.functionOfLanguageFormService.form.isDirty}
      />
    );
  }
}

export default observer(FunctionOfLanguageFormContainer);
