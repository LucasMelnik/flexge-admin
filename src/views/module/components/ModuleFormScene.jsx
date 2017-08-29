import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Button from '../../../core/form/Button';
import ModuleFormContainer from './ModuleFormContainer';
import Card from '../../../core/layout/Card';
import Breadcrumb from '../../../core/layout/Breadcrumb';

const ModuleFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Modules',
          link: '/modules',
        },
        {
          text: props.params.moduleId ? 'Update Module' : 'New Module',
        },
      ]}
    />
    <Card
      title={props.params.moduleId ? 'Update Module' : 'New Module'}
      actions={
        <Button
          icon="fa-arrow-left"
          label="Back"
          onClick={() => browserHistory.push('/modules')}
        />
      }
    >
      <ModuleFormContainer moduleId={props.params.moduleId} />
    </Card>
  </div>
);

ModuleFormScene.propTypes = {
  params: PropTypes.shape({
    moduleId: PropTypes.string,
  })
};

ModuleFormScene.defaultProps = {
  params: null,
};

export default ModuleFormScene;
