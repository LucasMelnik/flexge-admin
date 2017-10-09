import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../../core-ant/Card';
import StudentRecordListContainer from './StudentRecordListContainer';

const StudentRecordScene = props => (
  <div>
    <Card
      title="Students Reports"
    >
      <StudentRecordListContainer
        schoolId={props.params.schoolId}
        classId={props.params.classId}
      />
    </Card>
  </div>
);

StudentRecordScene.propTypes = {
  params: PropTypes.shape({
    schoolId: PropTypes.string,
    classId: PropTypes.string,
  }).isRequired,
};

export default StudentRecordScene;
