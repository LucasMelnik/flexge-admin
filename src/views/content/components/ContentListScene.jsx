import React from 'react';
import Card from '../../../core/layout/Card';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import ContentListContainer from './ContentListContainer';
import ContentListFilterContainer from './ContentListFilterContainer';

const ContentListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Search Content',
        },
      ]}
    />
    <Card
      title="Search Content"
    >
      <ContentListFilterContainer />
      <ContentListContainer />
    </Card>
  </div>
);

export default ContentListScene;
