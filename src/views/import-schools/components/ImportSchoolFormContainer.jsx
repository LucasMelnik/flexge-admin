import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ImportSchoolForm from './ImportSchoolForm';
import ImportSchoolFormService from '../services/ImportSchoolFormService';

class ImportSchoolFormContainer extends Component {
  importSchoolFormService = new ImportSchoolFormService();

  render() {
    return (
      <ImportSchoolForm
        onSubmit={this.importSchoolFormService.handleConfirm}
        onChange={this.importSchoolFormService.form.setValue}
        onReset={this.importSchoolFormService.form.reset}
        values={this.importSchoolFormService.form.getValues()}
        errors={this.importSchoolFormService.form.errors}
        submitting={this.importSchoolFormService.submit.fetching}
        onUpload={this.importSchoolFormService.handleUpload}
      />
    );
  }
}

export default observer(ImportSchoolFormContainer);
