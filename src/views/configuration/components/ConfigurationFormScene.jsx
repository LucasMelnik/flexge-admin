import React from 'react';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import ConfigurationFormContainer from './ConfigurationFormContainer';

const ConfigurationScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'General Configurations',
          link: '/configuration',
        },
        {
          text: 'Edit Configurations',
        },
      ]}
    />
    <Card
      title="General Configurations"
    >
      <ConfigurationFormContainer />
    </Card>
  </div>
);

export default ConfigurationScene;
