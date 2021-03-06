import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import ItemTypeListFilterContainer from './ItemTypeListFilterContainer';
import ItemTypeListContainer from './ItemTypeListContainer';

const ItemTypeListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Item types',
        },
      ]}
    />
    <Card
      title="Item Types"
      actions={
        <Button
          type="primary"
          label="New item type"
          icon="plus"
          onClick={() => browserHistory.push('/item-types/new')}
        />
      }
    >
      <ItemTypeListFilterContainer />
      <ItemTypeListContainer />
    </Card>
  </div>
);

export default ItemTypeListScene;
