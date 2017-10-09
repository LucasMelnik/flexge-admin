import React from 'react';
import Card from '../../../core-ant/Card';
import Separator from '../../../core/layout/Separator';
import StudentRecordSelectContainer from './student/StudentRecordSelectContainer';
import SchoolRecordListContainer from './school/SchoolRecordListContainer';

const FilterRecordScene = () => (
  <div>
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
