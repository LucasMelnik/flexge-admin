import React, { Component } from 'react';
import { observer } from 'mobx-react';
import UnitItemCharacterForm from './UnitItemCharacterForm';
import UnitItemListService from '../../../services/UnitItemListService';
import UnitItemCharacterFormService from '../../../services/UnitItemCharacterFormService';

class UnitItemCharacterFormContainer extends Component {

  unitItemCharacterFormService = new UnitItemCharacterFormService();

  componentWillMount() {
    this.unitItemCharacterFormService.init();
  }

  render() {
    return (
      <UnitItemCharacterForm
        onSubmit={this.unitItemCharacterFormService.handleSubmit}
        onChange={this.unitItemCharacterFormService.form.setValue}
        onReset={this.unitItemCharacterFormService.form.reset}
        values={this.unitItemCharacterFormService.form.getValues()}
        errors={this.unitItemCharacterFormService.form.errors}
        submitting={
          UnitItemListService.fetch.fetching ||
          this.unitItemCharacterFormService.fetch.fetching ||
          this.unitItemCharacterFormService.submit.fetching
        }
        isDirty={this.unitItemCharacterFormService.form.isDirty}
      />
    );
  }
}

export default observer(UnitItemCharacterFormContainer);
