import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import WhitelabelConfigListContainer from './WhitelabelConfigListContainer';

const WhitelabelConfigListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Whitelabel Config',
        },
      ]}
    />
    <Card
      title="Whitelabel"
      actions={
        <Button
          type="primary"
          label="New Whitelabel"
          icon="plus"
          onClick={() => browserHistory.push('/whitelabel-configs/new')}
        />
      }
    >
      <WhitelabelConfigListContainer />
    </Card>
  </div>
);

export default WhitelabelConfigListScene;
