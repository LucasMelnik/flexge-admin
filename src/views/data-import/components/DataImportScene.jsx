import React from 'react';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Separator from '../../../core/layout/Separator';
import Tabs from '../../../core/layout/Tabs';
import DownloadSampleFile from '../../../core/form/DownloadSampleFile';
import File from '../import-data-template.xlsx';
import DataImportFormContainer from './DataImportFormContainer';
import DataImportFilterContainer from './DataImportFilterContainer';
import DataImportResultListContainer from './DataImportResultListContainer';

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
    <Separator />
    <Tabs
      tabs={[
        {
          title: 'Companies',
          content: <DataImportResultListContainer path="companies" />,
        },
        {
          title: 'Schools',
          content: <DataImportResultListContainer path="schools" />,
        },
        {
          title: 'Users',
          content: <DataImportResultListContainer path="users" />,
        },
        {
          title: 'School Classes',
          content: <DataImportResultListContainer path="schoolClasses" />,
        },
        {
          title: 'Students',
          content: <DataImportResultListContainer path="students" />,
        },
      ]}
    />
  </div>
);

export default DataImportScene;
