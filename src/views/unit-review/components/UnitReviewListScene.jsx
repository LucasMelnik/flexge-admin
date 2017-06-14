import React from 'react';
import Tabs from '../../../core/navigation/Tabs';
import MyUnitReviewListContainer from './MyUnitReviewListContainer';
import ToReviewUnitReviewListContainer from './ToReviewUnitReviewListContainer';

const UnitReviewListScene = () => (
  <Tabs
    tabs={[
      {
        content: <ToReviewUnitReviewListContainer />,
        label: 'Units to review',
      },
      {
        content: <MyUnitReviewListContainer />,
        label: 'My units in review',
      },
    ]}
  />
);

export default UnitReviewListScene;
