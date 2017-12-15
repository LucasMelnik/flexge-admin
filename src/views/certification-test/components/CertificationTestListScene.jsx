import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import Tabs from '../../../core/layout/Tabs';
import CertificationTestListPendingContainer from './CertificationTestListPendingContainer';
import CertificationTestListScheduledContainer from './CertificationTestListScheduledContainer';
import CertificationTestListCompletedContainer from './CertificationTestListCompletedContainer';

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
            <Card
              actions={
                <Button
                  label="New certification test"
                  icon="plus"
                  onClick={() => browserHistory.push('/certification-test/new')}
                />
              }
            >
              <CertificationTestListPendingContainer />
            </Card>
          ),
          title: 'Pending Schedule',
        },
        {
          content: (
            <Card
              actions={
                <Button
                  label="New certification test"
                  icon="plus"
                  onClick={() => browserHistory.push('/certification-test/new')}
                />
              }
            >
              <CertificationTestListScheduledContainer />
            </Card>
          ),
          title: 'Scheduled',
        },
        {
          content: (
            <Card
              actions={
                <Button
                  label="New certification test"
                  icon="plus"
                  onClick={() => browserHistory.push('/certification-test/new')}
                />
              }
            >
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
