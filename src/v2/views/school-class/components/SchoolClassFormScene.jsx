import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import SchoolClassFormContainer from './SchoolClassFormContainer';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Button from '../../../core/form/Button';
import Card from '../../../core/layout/Card';

const SchoolClassFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'School Classes',
          link: '/v2/classes',
        },
        {
          text: props.params.classId ? 'Edit Class' : 'Create Class',
        },
      ]}
    />
    <Card
      title={props.params.classId ? 'Update Class' : 'Create Class'}
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
      <SchoolClassFormContainer
        schoolId={props.params.schoolId}
        classId={props.params.classId}
      />
    </Card>
  </div>
);

SchoolClassFormScene.propTypes = {
  params: PropTypes.shape({
    schoolId: PropTypes.string,
    classId: PropTypes.string,
  }),
};

SchoolClassFormScene.defaultProps = {
  params: null,
};

export default SchoolClassFormScene;
