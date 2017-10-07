import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '../../../../core-ant/Tabs';
import StudentDetailContentRecordListContainer from './StudentDetailContentRecordListContainer';
import Card from '../../../../core-ant/Card';
import StudentDetailDateRecordListContainer from './StudentDetailDateRecordListContainer';

const StudentDetailRecordScene = props => (
  <Tabs
    tabs={[
      {
        title: 'Progresso por Conteudo',
        content:
          (
            <Card>
              <StudentDetailContentRecordListContainer />
            </Card>
          ),
      },
      {
        title: 'Progreso por Data',
        content:
          (
            <Card>
              <StudentDetailDateRecordListContainer studentId={props.params.studentId} />
            </Card>
          ),
      },
    ]}
  />
);

StudentDetailRecordScene.propTypes = {
  params: PropTypes.shape({
    schoolId: PropTypes.string,
    classId: PropTypes.string,
    studentId: PropTypes.string,
  }).isRequired,
};

export default StudentDetailRecordScene;
