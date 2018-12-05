import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import InstructionForm from './InstructionForm';
import InstructionFormService from '../../services/InstructionFormService';

class InstructionFormContainer extends Component {

  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
    itemTypeId: PropTypes.string.isRequired,
    instructionId: PropTypes.string,
  };

  static defaultProps = {
    instructionId: null,
  };

  instructionFormService = new InstructionFormService();
  componentWillMount() {
    this.instructionFormService.handleLoad(this.props.itemTypeId, this.props.instructionId, this.props.onSuccess);
  }

  render() {
    return (
      <InstructionForm
        onSubmit={this.instructionFormService.handleSubmit}
        onChange={this.instructionFormService.form.setValue}
        onReset={this.instructionFormService.form.reset}
        values={this.instructionFormService.form.getValues()}
        errors={this.instructionFormService.form.errors}
        submitting={this.instructionFormService.submit.fetching}
        error={this.instructionFormService.submit.error}
        isDirty={this.instructionFormService.form.isDirty}
      />
    );
  }
}

export default observer(InstructionFormContainer);
