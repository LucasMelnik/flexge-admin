import React from 'react';
import { browserHistory } from 'react-router';
import Button from '../../../core/form/Button';
import ModuleListContainer from './ModuleListContainer';
import ModuleListFilterContainer from './ModuleListFilterContainer';
import Card from '../../../core/layout/Card';
import Breadcrumb from '../../../core/layout/Breadcrumb';

const ModuleListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Modules',
        },
      ]}
    />
    <Card
      title="Modules"
      actions={localStorage.role === 'CONTENT_ADMIN' && (
        <Button
          type="primary"
          icon="plus"
          onClick={() => browserHistory.push('/modules/new')}
          label="New module"
        />
      )}
    >
      <ModuleListFilterContainer />
      <ModuleListContainer />
    </Card>
  </div>
);

export default ModuleListScene;
