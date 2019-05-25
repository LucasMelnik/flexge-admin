import React from 'react';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import DownloadSampleFile from '../../../core/form/DownloadSampleFile';
import File from '../import-data-template.xlsx';
import DataImportFormContainer from './DataImportFormContainer';
import DataImportFilterContainer from './DataImportFilterContainer';

const DataImportScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Import Data',
        },
      ]}
    />
    <Card
      title="Import Data"
      actions={<DownloadSampleFile fileName="import-data-template.xlsx" fileLocation={File} />}
    >
      <DataImportFilterContainer />
      <DataImportFormContainer />
    </Card>
  </div>
);

export default DataImportScene;
