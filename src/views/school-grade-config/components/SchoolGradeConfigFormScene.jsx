import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Separator from '../../../core/layout/Separator';
import SchoolGradeConfigFormContainer from './SchoolGradeConfigFormContainer';
import SchoolGradeConfigFilterContainer from './SchoolGradeConfigFilterContainer';

const SchoolGradeConfigFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Grade Configuration',
        },
      ]}
    />
    {(localStorage.role === 'ADMIN' || localStorage.role === 'COMPANY_MANAGER') && ([
      <Card key="card">
        <SchoolGradeConfigFilterContainer />
      </Card>,
      <Separator key="separator" />,
    ])}
    {props.schoolId && (
      <Card title="Grade Configuration">
        <SchoolGradeConfigFormContainer schoolId={props.schoolId} />
      </Card>
    )}
  </div>
);

SchoolGradeConfigFormScene.propTypes = {
  schoolId: PropTypes.string,
};

SchoolGradeConfigFormScene.defaultProps = {
  schoolId: null,
};

export default SchoolGradeConfigFormScene;
