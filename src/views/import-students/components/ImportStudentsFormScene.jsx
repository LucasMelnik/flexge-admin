import React from 'react';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import ImportStudentsFormContainer from './ImportStudentsFormContainer';

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
    >
      <ImportStudentsFormContainer />
    </Card>
  </div>
);

export default ImportStudentsFormScene;
