import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import LocalizationFormContainer from './LocalizationFormContainer';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';

const LocalizationFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: `${props.params.localizationId ? 'Edit Localization' : 'Create Localization'}`,
        },
      ]}
    />
    <Card
      title={props.params.localizationId ? 'Edit Localization' : 'Create Localization'}
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
      <LocalizationFormContainer characterId={props.params.localizationId} />
    </Card>
  </div>
);

LocalizationFormScene.propTypes = {
  params: PropTypes.shape({
    localizationId: PropTypes.string,
  }),
};

LocalizationFormScene.defaultProps = {
  params: null,
};

export default LocalizationFormScene;
