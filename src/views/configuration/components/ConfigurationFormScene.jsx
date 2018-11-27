import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import ConfigurationFormContainer from './ConfigurationFormContainer';
import Button from '../../../core/form/Button';

const ConfigurationScene = ({ params }) => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'General Configurations',
          link: '/configurations',
        },
        {
          text: params.configurationId ? 'Edit Configuration' : 'New Configuration',
        },
      ]}
    />
    <Card
      title={params.configurationId ? 'Edit Configuration' : 'New Configuration'}
      actions={
        (
          <Button
            icon="arrow-left"
            label="Back"
            type="default"
            onClick={() => browserHistory.goBack()}
          />
        )
      }
    >
      <ConfigurationFormContainer configurationId={params.configurationId} />
    </Card>
  </div>
);

ConfigurationScene.propTypes = {
  params: PropTypes.shape({
    configurationId: PropTypes.string,
  }),
};

ConfigurationScene.defaultProps = {
  params: {},
};

export default ConfigurationScene;
