import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import StateForm from './StateForm';
import StateFormService from '../services/StateFormService';

class StateFormContainer extends Component {

  static propTypes = {
    stateId: PropTypes.string,
  };

  static defaultProps = {
    stateId: null,
  };

  stateFormService = new StateFormService();
  componentWillMount() {
    this.stateFormService.handleLoad(this.props.stateId);
  }

  render() {
    return (
      <StateForm
        onSubmit={this.stateFormService.handleSubmit}
        onChange={this.stateFormService.form.setValue}
        onReset={this.stateFormService.form.reset}
        values={this.stateFormService.form.getValues()}
        errors={this.stateFormService.form.errors}
        submitting={this.stateFormService.submit.fetching}
        isDirty={this.stateFormService.form.isDirty}
      />
    );
  }
}

export default observer(StateFormContainer);
