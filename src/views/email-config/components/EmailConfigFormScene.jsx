import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../core/layout/Card';
import Separator from '../../../core/layout/Separator';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import EmailConfigFormContainer from './EmailConfigFormContainer';
import EmailConfigFilterContainer from './EmailConfigFilterContainer';

const EmailConfigFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Email Configuration',
        },
      ]}
    />
    {(localStorage.role === 'ADMIN' || localStorage.role === 'COMPANY_MANAGER') && ([
      <Card key="filter">
        <EmailConfigFilterContainer />
      </Card>,
      <Separator key="separator" />,
    ])}
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
