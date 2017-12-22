import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ImportStudentsForm from './ImportStudentsForm';
import ImportStudentsFormService from '../services/ImportStudentsFormService';

class ImportStudentsFormContainer extends Component {
  importStudentsFormService = new ImportStudentsFormService();

  render() {
    return (
      <ImportStudentsForm
        onSubmit={this.importStudentsFormService.handleConfirm}
        onChange={this.importStudentsFormService.form.setValue}
        onReset={this.importStudentsFormService.form.reset}
        values={this.importStudentsFormService.form.getValues()}
        errors={this.importStudentsFormService.form.errors}
        submitting={this.importStudentsFormService.submit.fetching}
        onUpload={this.importStudentsFormService.handleUpload}
      />
    );
  }
}

export default observer(ImportStudentsFormContainer);
