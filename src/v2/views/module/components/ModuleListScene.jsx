import React from 'react';
import { browserHistory } from 'react-router';
import Separator from '../../../core/layout/Separator';
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
      actions={
        <Button
          icon="fa-plus"
          onClick={() => browserHistory.push('/v2/modules/new')}
          label="New module"
        />
      }
    >
      <ModuleListFilterContainer />
      <Separator />
      <ModuleListContainer />
    </Card>
  </div>
);

export default ModuleListScene;
