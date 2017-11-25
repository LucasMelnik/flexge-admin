import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import SchoolGradeConfigFormContainer from './SchoolGradeConfigFormContainer';

const SchoolGradeConfigFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: `${props.params.schoolId ? 'Update School Grade Configuration' : 'Create School Grade Configuration'}`,
        },
      ]}
    />
    <Card
      title={props.params.schoolId ? 'Update School Grade Configuration' : 'Create School Grade Configuration'}
    >
      <SchoolGradeConfigFormContainer
        schoolId={props.params.schoolId}
      />
    </Card>
  </div>
);

SchoolGradeConfigFormScene.propTypes = {
  params: PropTypes.shape({
    schoolId: PropTypes.string,
  }).isRequired,
};

export default SchoolGradeConfigFormScene;
