import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import ConfigurationListContainer from './ConfigurationListContainer';

const ConfigurationListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Configurations',
        },
      ]}
    />
    <Card
      title="Configurations"
      actions={
        <Button
          type="primary"
          label="New configuration"
          icon="plus"
          onClick={() => browserHistory.push('/configurations/new')}
        />
      }
    >
      <ConfigurationListContainer />
    </Card>
  </div>
);

export default ConfigurationListScene;
