import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Separator from '../../../core/layout/Separator';
import SchoolGradeConfigFormContainer from './SchoolGradeConfigFormContainer';
import SchoolGradeConfigFilterContainer from './SchoolGradeConfigFilterContainer';
import { Roles } from '../../../core/util';
import PermissionValidator from '../../../core/layout/PermissionValidator';

const SchoolGradeConfigFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Grade Configuration',
        },
      ]}
    />
    <PermissionValidator allowedFor={[Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER]}>
      <React.Fragment>
        <Card key="card">
          <SchoolGradeConfigFilterContainer />
        </Card>
        <Separator key="separator" />
      </React.Fragment>
    </PermissionValidator>
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
