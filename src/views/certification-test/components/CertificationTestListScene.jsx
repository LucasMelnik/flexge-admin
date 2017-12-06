import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import CertificationTestListFilterContainer from './CertificationTestListFilterContainer';
import CertificationTestListContainer from './CertificationTestListContainer';

const CertificationTestListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Certification Tests',
        },
      ]}
    />
    <Card
      title="Certification Tests"
      actions={
        <Button
          label="New certification test"
          icon="plus"
          onClick={() => browserHistory.push('/certification-test/new')}
        />
      }
    >
      <CertificationTestListFilterContainer />
      <CertificationTestListContainer />
    </Card>
  </div>
);

export default CertificationTestListScene;
