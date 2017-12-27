import React from 'react';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Tabs from '../../../core/layout/Tabs';
import CertificationTestExecutionListPendingContainer from './CertificationTestExecutionListPendingContainer';
import CertificationTestExecutionListScheduledContainer from './CertificationTestExecutionListScheduledContainer';
import CertificationTestExecutionListCompletedContainer from './CertificationTestExecutionListCompletedContainer';

const CertificationTestExecutionListScene = () => (
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
              <CertificationTestExecutionListPendingContainer />
            </Card>
          ),
          title: 'Pending Schedule',
        },
        {
          content: (
            <Card>
              <CertificationTestExecutionListScheduledContainer />
            </Card>
          ),
          title: 'Scheduled',
        },
        {
          content: (
            <Card>
              <CertificationTestExecutionListCompletedContainer />
            </Card>
          ),
          title: 'Completed',
        },
      ]}
    />
  </div>
);

export default CertificationTestExecutionListScene;
