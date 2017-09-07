import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import CourseFormContainer from './CourseFormContainer';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';

const CourseFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: `${props.courseId ? 'Edit Course' : 'Create Course'}`,
        },
      ]}
    />
    <Card
      title={props.courseId ? 'Edit Course' : 'Create Course'}
      actions={
        (
          <Button
            icon="fa-arrow-left"
            label="Back"
            type="default"
            onClick={() => browserHistory.goBack()}
          />
        )
      }
    >
      <CourseFormContainer courseId={props.courseId} />
    </Card>
  </div>
);

CourseFormScene.propTypes = {
  courseId: PropTypes.string,
};

CourseFormScene.defaultProps = {
  courseId: null,
};

export default CourseFormScene;
