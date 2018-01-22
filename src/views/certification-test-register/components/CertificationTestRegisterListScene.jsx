import React from 'react';
import { browserHistory } from 'react-router';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import CertificationTestRegisterListContainer from './CertificationTestRegisterListContainer';
import CertificationTestRegisterListFilterContainer from './CertificationTestRegisterListFilterContainer';

const CertificationTestRegisterListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Placement Test',
        },
      ]}
    />
    <Card
      title="Placement Test"
      actions={
        <Button
          type="primary"
          label="New Grammar"
          icon="plus"
          onClick={() => browserHistory.push('/certification-test-register/new')}
        />
      }
    >
      <CertificationTestRegisterListFilterContainer />
      <CertificationTestRegisterListContainer />
    </Card>
  </div>
);

export default CertificationTestRegisterListScene;
