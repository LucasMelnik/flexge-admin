import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import StudentFormContainer from './StudentFormContainer';

const StudentFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Students',
          link: '/v2/students',
        },
        {
          text: props.params.studentId ? 'Edit Student' : 'Create Student',
        },
      ]}
    />
    <StudentFormContainer studentId={props.params.studentId} />
  </div>
);

StudentFormScene.propTypes = {
  params: PropTypes.shape({
    studentId: PropTypes.string,
  }),
};

StudentFormScene.defaultProps = {
  params: null,
};

export default StudentFormScene;
