import React from 'react';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import ImportStudentsFormContainer from './ImportStudentsFormContainer';
import DownloadSampleFile from '../../../core/form/DownloadSampleFile';
import File from '../import-student-sample.xlsx';

const ImportStudentsFormScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Import Students',
        },
      ]}
    />
    <Card
      title="Import Students"
      actions={<DownloadSampleFile fileName="import-student.xlsx" fileLocation={File} />}
    >
      <ImportStudentsFormContainer />
    </Card>
  </div>
);

export default ImportStudentsFormScene;
