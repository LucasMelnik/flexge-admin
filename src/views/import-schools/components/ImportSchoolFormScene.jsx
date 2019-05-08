import React from 'react';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import ImportSchoolFormContainer from './ImportSchoolFormContainer';
import DownloadSampleFile from '../../../core/form/DownloadSampleFile';
import File from '../import-school-sample.xlsx';

const ImportSchoolFormScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Import Schools',
        },
      ]}
    />
    <Card
      title="Import Schools"
      actions={<DownloadSampleFile fileName="import-school.xlsx" fileLocation={File} />}
    >
      <ImportSchoolFormContainer />
    </Card>
  </div>
);

export default ImportSchoolFormScene;
