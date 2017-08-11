import React from 'react';
import PropTypes from 'prop-types';
import SchoolFormContainer from './SchoolFormContainer';
import Breadcrumb from '../../../core/layout/Breadcrumb';

const SchoolFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Schools',
          link: '/v2/schools',
        },
        {
          text: props.params.schoolId ? 'Edit School' : 'Create School',
        },
      ]}
    />
    <SchoolFormContainer schoolId={props.params.schoolId} />
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
