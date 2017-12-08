import React from 'react';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Select from '../../../core/form/Select';

const EmailsScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Email Configuration',
        },
      ]}
    />
    <Card title="Email Configuration">
      <div style={{ width: 250 }}>
        <Select
          label="Frequency to send email to parents"
          options={[
            {
              label: 'Weekly',
              value: 'weekly',
            },
            {
              label: 'Each two weeks',
              value: 'each_to_weeks',
            },
            {
              label: 'Monthly',
              value: 'monthly',
            },
          ]}
        />
      </div>
    </Card>
  </div>
);

export default EmailsScene;
