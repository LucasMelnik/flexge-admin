import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import GrammarForm from './GrammarForm';
import GrammarFormService from '../services/GrammarFormService';

class GrammarFormContainer extends Component {

  static propTypes = {
    grammarId: PropTypes.string,
  };

  static defaultProps = {
    grammarId: null,
  };

  grammarFormService = new GrammarFormService();

  componentWillMount() {
    this.grammarFormService.handleLoad(this.props.grammarId);
  }

  render() {
    return (
      <GrammarForm
        onSubmit={this.grammarFormService.handleSubmit}
        onChange={this.grammarFormService.form.setValue}
        onReset={this.grammarFormService.form.reset}
        values={this.grammarFormService.form.getValues()}
        errors={this.grammarFormService.form.errors}
        submitting={this.grammarFormService.submit.fetching}
        isDirty={this.grammarFormService.form.isDirty}
      />
    );
  }
}

export default observer(GrammarFormContainer);
