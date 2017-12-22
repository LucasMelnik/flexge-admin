import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Tabs from '../../../core/layout/Tabs';
import CertificationTestListPendingContainer from './CertificationTestListPendingContainer';
import CertificationTestListScheduledContainer from './CertificationTestListScheduledContainer';
import CertificationTestListCompletedContainer from './CertificationTestListCompletedContainer';
import Button from '../../../core/form/Button';

const CertificationTestListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Certification Tests',
        },
      ]}
    />
    <Tabs
      tabs={[
        {
          content: (
            <Card>
              <CertificationTestListPendingContainer />
            </Card>
          ),
          title: 'Pending Schedule',
        },
        {
          content: (
            <Card>
              <CertificationTestListScheduledContainer />
            </Card>
          ),
          title: 'Scheduled',
        },
        {
          content: (
            <Card>
              <CertificationTestListCompletedContainer />
            </Card>
          ),
          title: 'Completed',
        },
      ]}
    />
  </div>
);

export default CertificationTestListScene;
