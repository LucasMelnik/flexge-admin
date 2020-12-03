import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import ContentVideoListFilterContainer from './ContentVideoListFilterContainer';
import ContentVideoListContainer from './ContentVideoListContainer';

const ContentVideoListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Content Videos',
        },
      ]}
    />
    <Card
      title="Content Videos"
      actions={
        <Button
          type="primary"
          label="New content video"
          icon="plus"
          onClick={() => browserHistory.push('/content-videos/new')}
        />
      }
    >
      <ContentVideoListFilterContainer/>
      <ContentVideoListContainer/>
    </Card>
  </div>
);

export default ContentVideoListScene;
