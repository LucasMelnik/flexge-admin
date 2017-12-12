import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../../core/layout/Card';
import Breadcrumb from '../../../../core/layout/Breadcrumb';
import StudentRecordListContainer from './StudentRecordListContainer';
import Separator from '../../../../core/layout/Separator';
import GrammarNeedsListContainer from '../common/GrammarNeedsListContainer';
import PerformanceGoals from '../../../dashboard/components/common/performance-goals/PerformanceGoals';

const StudentRecordScene = props => (
  <div>
    <Breadcrumb
      fetching={props.fetching}
      crumbs={[
        {
          text: 'Records',
          link: '/records/filters',
        },
        {
          text: `School - ${props.school.name}`,
          link: `/records/schools/${props.school.id}/classes`,
        },
        {
          text: `Class - ${props.class.name}`,
        },
      ]}
    />
    <Card title="Your goal is to keep all values green!">
      <PerformanceGoals
        schoolId={props.schoolId}
        classId={props.classId}
      />
    </Card>
    <Separator />
    <Card
      title="Analytics"
      fetching={props.fetching}
    >
      <h2>Students Grammar Needs</h2>
      <GrammarNeedsListContainer
        schoolId={props.schoolId}
        classId={props.classId}
      />
      <Separator />
      <h2>Students Records</h2>
      <StudentRecordListContainer
        schoolId={props.schoolId}
        classId={props.classId}
      />
    </Card>
  </div>
);

StudentRecordScene.propTypes = {
  schoolId: PropTypes.string.isRequired,
  classId: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  school: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  class: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

StudentRecordScene.defaultProps = {
  school: {},
  class: {},
};

export default StudentRecordScene;
