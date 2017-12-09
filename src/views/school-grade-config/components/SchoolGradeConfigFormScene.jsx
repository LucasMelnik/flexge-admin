import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import SchoolGradeConfigFormContainer from './SchoolGradeConfigFormContainer';

const SchoolGradeConfigFormScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Grade Configuration',
        },
      ]}
    />
    <Card title="Grade Configuration">
      <SchoolGradeConfigFormContainer />
    </Card>
  </div>
);

export default SchoolGradeConfigFormScene;
