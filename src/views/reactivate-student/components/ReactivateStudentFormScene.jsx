import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import ReactivateStudentFormContainer from './ReactivateStudentFormContainer';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';

const ReactivateStudentFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Reactivate Student',
        },
      ]}
    />
    <Card
      title="Reactivate Student"
      actions={
        (
          <Button
            icon="arrow-left"
            label="Back"
            type="default"
            onClick={() => browserHistory.goBack()}
          />
        )
      }
    >
      <ReactivateStudentFormContainer
        studentId={props.params.studentId}
        schoolId={props.params.schoolId}
      />
    </Card>
  </div>
);

ReactivateStudentFormScene.propTypes = {
  params: PropTypes.shape({
    studentId: PropTypes.string,
  }).isRequired,
};

export default ReactivateStudentFormScene;
