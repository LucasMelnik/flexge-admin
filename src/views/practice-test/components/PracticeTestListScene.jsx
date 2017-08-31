import React from 'react';
import { browserHistory } from 'react-router';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Separator from '../../../core/layout/Separator';
import PracticeTestListContainer from './PracticeTestListContainer';

const PracticeTestListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Practice Test',
        },
      ]}
    />
    <Card
      title="Practice Test"
      actions={
        <Button
          label="New Practice Test"
          icon="fa-plus"
          onClick={() => browserHistory.push('/practice-test/new')}
        />
      }
    >
      <Separator />
      <PracticeTestListContainer />
    </Card>
  </div>
);

export default PracticeTestListScene;
