import React from 'react';
import PropTypes from 'prop-types';
import PracticeTestItems from './PracticeTestItems';
import Breadcrumb from '../../../core/layout/Breadcrumb';

const PracticeTestFormScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Practice Test',
        }
      ]}
    />

    <PracticeTestItems />
  </div>
);

export default PracticeTestFormScene;
