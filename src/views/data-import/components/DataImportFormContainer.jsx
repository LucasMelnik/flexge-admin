import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DataImportForm from './DataImportForm';
import DataImportService from '../services/DataImportService';

class DataImportFormContainer extends Component {

  render() {
    return (
      <DataImportForm
        onConfirm={DataImportService.handleConfirm}
        onCancel={DataImportService.handleCancel}
        onUpload={DataImportService.handleUpload}
        onChange={DataImportService.form.setValue}
        values={DataImportService.form.getValues()}
        errors={DataImportService.form.errors}
        submitting={DataImportService.submit.fetching || DataImportService.fetch.fetching}
      />
    );
  }
}

export default observer(DataImportFormContainer);
