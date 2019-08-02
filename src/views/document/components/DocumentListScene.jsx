import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import DocumentListContainer from './DocumentListContainer';

const DocumentListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Documents',
        },
      ]}
    />
    <Card
      title="Documents"
      actions={
        <Button
          type="primary"
          label="New document"
          icon="plus"
          onClick={() => browserHistory.push('/documents/new')}
        />
      }
    >
      <DocumentListContainer />
    </Card>
  </div>
);

export default DocumentListScene;
