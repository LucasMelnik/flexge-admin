import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../core/layout/Card';
import Separator from '../../../core/layout/Separator';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import EmailConfigFormContainer from './EmailConfigFormContainer';
import EmailConfigFilterContainer from './EmailConfigFilterContainer';
import PermissionValidator from '../../../core/layout/PermissionValidator';
import { Roles } from '../../../core/util';

const EmailConfigFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Email Configuration',
        },
      ]}
    />
    <PermissionValidator
      allowedFor={[Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER]}
    >
      <div>
        <Card key="filter">
          <EmailConfigFilterContainer />
        </Card>
        <Separator key="separator" />
      </div>
    </PermissionValidator>
    {props.schoolId && (
      <Card title="Email Configuration">
        <EmailConfigFormContainer schoolId={props.schoolId} />
      </Card>
    )}
  </div>
);

EmailConfigFormScene.propTypes = {
  schoolId: PropTypes.string,
};

EmailConfigFormScene.defaultProps = {
  schoolId: null,
};

export default EmailConfigFormScene;
