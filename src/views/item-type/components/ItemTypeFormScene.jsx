import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import ItemTypeFormContainer from './ItemTypeFormContainer';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Separator from '../../../core/layout/Separator';
import InstructionScene from './instructions/InstructionScene';

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
    {props.params.itemTypeId && (
      <div>
        <Separator size="md" />
        <InstructionScene itemTypeId={props.params.itemTypeId} />
      </div>
    )}
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
