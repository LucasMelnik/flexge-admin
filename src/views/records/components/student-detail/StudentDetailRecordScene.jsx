import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '../../../../core/layout/Tabs';
import Card from '../../../../core/layout/Card';
import Breadcrumb from '../../../../core/layout/Breadcrumb';
import StudentDetailContentRecordListContainer from './StudentDetailContentRecordListContainer';
import StudentDetailDateRecordListContainer from './StudentDetailDateRecordListContainer';

const StudentDetailRecordScene = props => (
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
          link: `/records/schools/${props.school.id}/classes/${props.class.id}/students`,
        },
        {
          text: `Student - ${props.student.name}`,
        },
      ]}
    />
    <Tabs
      tabs={[
        {
          title: 'Content Progress',
          content:
            (
              <Card>
                <StudentDetailContentRecordListContainer studentId={props.studentId} />
              </Card>
            ),
        },
        {
          title: 'Daily Progress',
          content:
            (
              <Card>
                <StudentDetailDateRecordListContainer studentId={props.studentId} />
              </Card>
            ),
        },
      ]}
    />
  </div>
);

StudentDetailRecordScene.propTypes = {
  schoolId: PropTypes.string.isRequired,
  classId: PropTypes.string.isRequired,
  studentId: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  school: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  class: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  student: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

StudentDetailRecordScene.defaultProps = {
  school: {},
  class: {},
  student: {},
};


export default StudentDetailRecordScene;
