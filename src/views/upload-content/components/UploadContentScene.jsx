import React from 'react';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import UploadContentFormContainer from './UploadContentFormContainer';

const UploadContentScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Upload content',
        },
      ]}
    />
    <Card
      title="Upload Content file"
    >
      <UploadContentFormContainer />
    </Card>
  </div>
);

export default UploadContentScene;
