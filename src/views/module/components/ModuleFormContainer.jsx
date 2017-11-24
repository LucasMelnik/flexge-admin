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

  componentWillMount() {
    ModuleFormService.handleLoad(this.props.moduleId);
  }

  render() {
    return (
      <ModuleForm
        onSubmit={ModuleFormService.handleSubmit}
        onChange={ModuleFormService.form.setValue}
        onReset={ModuleFormService.form.reset}
        values={ModuleFormService.form.getValues()}
        errors={ModuleFormService.form.errors}
        submitting={ModuleFormService.fetch.fetching}
        isDirty={ModuleFormService.form.isDirty}
      />
    );
  }
}

export default observer(ModuleFormContainer);
