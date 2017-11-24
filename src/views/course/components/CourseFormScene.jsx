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
          text: `${props.params.courseId ? 'Edit Course' : 'Create Course'}`,
        },
      ]}
    />
    <Card
      title={props.params.courseId ? 'Edit Course' : 'Create Course'}
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
      <CourseFormContainer courseId={props.params.courseId} />
    </Card>
  </div>
);

CourseFormScene.propTypes = {
  params: PropTypes.shape({
    courseId: PropTypes.string,
  }),
};

CourseFormScene.defaultProps = {
  params: null,
};

export default CourseFormScene;
