import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ModuleForm from './ModuleForm';
import ModuleFormService from '../services/ModuleFormService';

class ModuleFormContainer extends Component {

  static propTypes = {
    moduleId: PropTypes.string,
  };

  static defaultProps = {
    moduleId: null,
  };

  moduleFormService = new ModuleFormService();
  componentWillMount() {
    this.moduleFormService.handleLoad(this.props.moduleId);
  }

  render() {
    return (
      <ModuleForm
        onSubmit={this.moduleFormService.handleSubmit}
        onChange={this.moduleFormService.form.setValue}
        onReset={this.moduleFormService.form.reset}
        values={this.moduleFormService.form.getValues()}
        errors={this.moduleFormService.form.errors}
        submitting={this.moduleFormService.submit.fetching}
        isDirty={this.moduleFormService.form.isDirty}
      />
    );
  }
}

export default observer(ModuleFormContainer);
