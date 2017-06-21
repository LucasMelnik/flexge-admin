import React from 'react';
import Tabs from '../../../core/navigation/Tabs';
import MyUnitReviewListContainer from './MyUnitReviewListContainer';
import ToReviewUnitListContainer from './ToReviewUnitListContainer';

const UnitReviewListScene = () => (
  <Tabs
    tabs={[
      {
        content: <MyUnitReviewListContainer />,
        label: 'My units',
      },
      {
        content: <ToReviewUnitListContainer />,
        label: 'Units to review',
      },
    ]}
  />
);

export default UnitReviewListScene;
