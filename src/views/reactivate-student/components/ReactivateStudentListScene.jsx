import React from 'react';
import Card from '../../../core/layout/Card';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import ReactivateStudentListFilterContainer from './ReactivateStudentListFilterContainer';
import ReactivateStudentListContainer from './ReactivateStudentListContainer';

const ReactivateStudentListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Removed Students',
        },
      ]}
    />
    <Card
      title="Removed Students"
    >
      <ReactivateStudentListFilterContainer />
      <ReactivateStudentListContainer />
    </Card>
  </div>
);

export default ReactivateStudentListScene;
