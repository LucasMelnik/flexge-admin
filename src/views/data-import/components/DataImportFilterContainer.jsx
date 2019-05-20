import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DataImportFilter from './DataImportFilter';
import DataImportService from '../services/DataImportService';

class DataImportFilterContainer extends Component {

  componentWillMount() {
    DataImportService.init();
  }

  render() {
    return (
      <DataImportFilter
        onFilter={DataImportService.handleFilter}
        onChange={DataImportService.form.setValue}
        onReset={DataImportService.form.reset}
        values={DataImportService.form.getValues()}
        errors={DataImportService.form.errors}
        submitting={DataImportService.submit.fetching}
      />
    );
  }
}

export default observer(DataImportFilterContainer);
