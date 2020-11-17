import React, { Component } from 'react';
import { observer } from 'mobx-react';
import UnitFunctionOfLanguageForm from './UnitFunctionOfLanguageForm';
import UnitItemListService from '../../../services/UnitItemListService';
import UnitFormService from '../../../services/UnitFormService';

class UnitFunctionOfLanguageFormContainer extends Component {

  unitFormService = new UnitFormService();

  componentWillMount() {
    this.unitFormService.handleLoad(this.props.unitId, this.props.moduleId);
  }

  render() {
    return (
      <UnitFunctionOfLanguageForm
        onSubmit={this.unitFormService.handleSubmit}
        onChange={this.unitFormService.form.setValue}
        onReset={this.unitFormService.form.reset}
        values={this.unitFormService.form.getValues()}
        errors={this.unitFormService.form.errors}
        submitting={
          UnitItemListService.fetch.fetching ||
          this.unitFormService.fetch.fetching ||
          this.unitFormService.submit.fetching
        }
        isDirty={this.unitFormService.form.isDirty}
        items={UnitItemListService.items}
      />
    );
  }
}

export default observer(UnitFunctionOfLanguageFormContainer);
