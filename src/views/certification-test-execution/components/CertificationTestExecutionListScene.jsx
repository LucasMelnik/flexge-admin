import React from 'react';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Tabs from '../../../core/layout/Tabs';
import CertificationTestExecutionListPendingContainer from './CertificationTestExecutionListPendingContainer';
import CertificationTestExecutionListScheduledContainer from './CertificationTestExecutionListScheduledContainer';
import CertificationTestExecutionListCompletedContainer from './CertificationTestExecutionListCompletedContainer';
import CertificationTestExecutionListPendingReviewContainer from './CertificationTestExecutionListPendingReviewContainer';

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
        ...localStorage.role !== 'CERTIFICATION_TEST_PROFESSIONAL' ? [{
          content: (
            <Card>
              <CertificationTestExecutionListPendingContainer />
            </Card>
          ),
          title: 'Pending Schedule',
          key: 'pending',
        }] : [],
        ...localStorage.role !== 'CERTIFICATION_TEST_PROFESSIONAL' ? [{
          content: (
            <Card>
              <CertificationTestExecutionListScheduledContainer />
            </Card>
          ),
          title: 'Scheduled',
          key: 'scheduled'
        }] : [],
        {
          content: (
            <Card>
              <CertificationTestExecutionListPendingReviewContainer />
            </Card>
          ),
          title: 'Pending Correction',
          key: 'pending-correction'
        },
        ...localStorage.role !== 'CERTIFICATION_TEST_PROFESSIONAL' ? [{
          content: (
            <Card>
              <CertificationTestExecutionListCompletedContainer />
            </Card>
          ),
          title: 'Completed',
          key: 'completed'
        }] : [],
      ]}
    />
  </div>
);

export default CertificationTestExecutionListScene;
