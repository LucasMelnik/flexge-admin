import React from 'react';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import LocalizationListContainer from './LocalizationListContainer';
import LocalizationListFilterContainer from './LocalizationListFilterContainer';
import { browserHistory } from 'react-router';
import Button from '../../../core/form/Button';

const LocalizationListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Localization',
        },
      ]}
    />
    <Card
      title="Localizations"
      actions={
        <Button
          type="primary"
          label="New item"
          icon="plus"
          onClick={() => browserHistory.push('/localization/new')}
        />
      }
    >
      <LocalizationListFilterContainer />
      <LocalizationListContainer />
    </Card>
  </div>
);

export default LocalizationListScene;
