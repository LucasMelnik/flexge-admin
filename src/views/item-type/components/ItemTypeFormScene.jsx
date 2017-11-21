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
          text: `${props.params.itemTypeId ? 'Edit Item Type' : 'Create Item Type'}`,
        },
      ]}
    />
    <Card
      title={props.params.itemTypeId ? 'Edit Item Type' : 'Create Item Type'}
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
      <ItemTypeFormContainer itemTypeId={props.params.itemTypeId} />
    </Card>
  </div>
);

ItemTypeFormScene.propTypes = {
  params: PropTypes.shape({
    itemTypeId: PropTypes.string,
  }),
};

ItemTypeFormScene.defaultProps = {
  params: null,
};

export default ItemTypeFormScene;
