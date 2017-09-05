import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Card from '../../../../core/layout/Card';
import StudentPlacementListContainer from './StudentPlacementListContainer';
import Breadcrumb from '../../../../core/layout/Breadcrumb';
import Button from '../../../../core/form/Button';

const StudentPlacementListScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Students',
          link: '/students',
        },
        {
          text: 'Placements',
        },
      ]}
    />
    <Card
      title="Student Placements"
      actions={
        <Button
          icon="fa fa-arrow-left"
          label="Back"
          onClick={() => browserHistory.goBack()}
        />
      }
    >
      <StudentPlacementListContainer
        studentId={props.params.studentId}
      />
    </Card>
  </div>
);

StudentPlacementListScene.propTypes = {
  params: PropTypes.shape({
    studentId: PropTypes.string,
  }).isRequired,
};

export default StudentPlacementListScene;
