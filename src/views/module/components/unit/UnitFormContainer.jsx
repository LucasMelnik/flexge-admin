import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import UnitForm from './UnitForm';
import UnitFormService from '../../services/UnitFormService';

class UnitFormContainer extends Component {

  static propTypes = {
    currentModule: PropTypes.object,
    unitId: PropTypes.string,
    moduleId: PropTypes.string,
  }

  static defaultProps = {
    currentModule: null,
    unitId: null,
    moduleId: null,
  }

  componentDidMount() {
    UnitFormService.handleLoad(this.props.unitId, this.props.moduleId);
  }

  componentWillReceiveProps(nextProps) {
    UnitFormService.form.setValue('module', nextProps.currentModule);
  }

  render() {
    return (
      <UnitForm
        onSubmit={UnitFormService.handleSubmit}
        onChange={UnitFormService.form.setValue}
        onReset={UnitFormService.form.reset}
        values={UnitFormService.form.getValues()}
        errors={UnitFormService.form.errors}
        submitting={UnitFormService.fetch.fetching}
        error={UnitFormService.fetch.error}
        isDirty={UnitFormService.form.isDirty}
      />
    );
  }
}

export default observer(UnitFormContainer);
