import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import SchoolFormContainer from './SchoolFormContainer';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Button from '../../../core/form/Button';
import Card from '../../../core/layout/Card';

const SchoolFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Schools',
          link: '/schools',
        },
        {
          text: `${props.schoolId ? 'Update School' : 'Create School'}`,
        },
      ]}
    />
    <Card
      title={props.schoolId ? 'Update School' : 'Create School'}
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
      <SchoolFormContainer
        schoolId={props.params.schoolId}
      />
    </Card>
  </div>
);

SchoolFormScene.propTypes = {
  params: PropTypes.shape({
    schoolId: PropTypes.string,
  }),
};

SchoolFormScene.defaultProps = {
  params: null,
};

export default SchoolFormScene;
