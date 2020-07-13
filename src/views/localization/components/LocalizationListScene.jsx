import React from 'react';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import LocalizationListContainer from './LocalizationListContainer';
import LocalizationListFilterContainer from './LocalizationListFilterContainer';

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
    >
      <LocalizationListFilterContainer />
      <LocalizationListContainer />
    </Card>
  </div>
);

export default LocalizationListScene;
