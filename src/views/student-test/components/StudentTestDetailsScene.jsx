import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Tabs from '../../../core/layout/Tabs';
import StudentPlacementListContainer from './placement/StudentPlacementListContainer';
import StudentMasteryDetails from './mastery/StudentMasteryDetails';
import Card from '../../../core/layout/Card';

const StudentTestDetailsScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Student Tests',
          link: '/student-tests',
        },
        {
          text: 'Placement/Mastery tests',
        },
      ]}
    />
    <Tabs
      tabs={[
        {
          title: 'Placement Tests',
          content: (
            <Card>
              <StudentPlacementListContainer studentId={props.params.studentId} />
            </Card>
                   ),
        },
        {
          title: 'Mastery Tests',
          content: (
            <Card>
              <StudentMasteryDetails studentId={props.params.studentId} />
            </Card>
                   ),
        },
      ]}
    />
  </div>
);

StudentTestDetailsScene.propTypes = {
  params: PropTypes.shape({
    studentId: PropTypes.string.isRequired,
  }).isRequired,
};

export default StudentTestDetailsScene;
