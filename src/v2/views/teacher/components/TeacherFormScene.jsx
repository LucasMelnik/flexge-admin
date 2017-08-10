import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import TeacherFormContainer from './TeacherFormContainer';

const TeacherFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Teachers',
          link: '/v2/teachers',
        },
        {
          text: props.params.teacherId ? 'Edit Teacher' : 'Create Teacher',
        },
      ]}
    />
    <TeacherFormContainer teacherId={props.params.teacherId} />
  </div>
);

TeacherFormScene.propTypes = {
  params: PropTypes.shape({
    teacherId: PropTypes.string,
  }),
};

TeacherFormScene.defaultProps = {
  params: null,
};

export default TeacherFormScene;
