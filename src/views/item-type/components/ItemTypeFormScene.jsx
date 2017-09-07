import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import ItemTypeFormContainer from './ItemTypeFormContainer';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';

const ItemTypeFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: `${props.itemTypeId ? 'Edit Item Type' : 'Create Item Type'}`,
        },
      ]}
    />
    <Card
      title={props.itemTypeId ? 'Edit Item Type' : 'Create Item Type'}
      actions={
        (
          <Button
            icon="fa-arrow-left"
            label="Back"
            type="default"
            onClick={() => browserHistory.goBack()}
          />
        )
      }
    >
      <ItemTypeFormContainer itemTypeId={props.itemTypeId} />
    </Card>
  </div>
);

ItemTypeFormScene.propTypes = {
  itemTypeId: PropTypes.string,
};

ItemTypeFormScene.defaultProps = {
  itemTypeId: null,
};

export default ItemTypeFormScene;
