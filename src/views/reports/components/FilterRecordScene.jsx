import React from 'react';
import Separator from '../../../core/layout/Separator';
import StudentRecordSelectContainer from './student/StudentRecordSelectContainer';
import SchoolRecordListContainer from './school/SchoolRecordListContainer';
import Card from '../../../core/layout/Card';
import Breadcrumb from '../../../core/layout/Breadcrumb';

const FilterRecordScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Records',
        },
      ]}
    />
    <Card title="Record by a Student">
      <StudentRecordSelectContainer />
    </Card>
    <Separator />
    <Card title="Record by School">
      <SchoolRecordListContainer />
    </Card>
  </div>
);

export default FilterRecordScene;
