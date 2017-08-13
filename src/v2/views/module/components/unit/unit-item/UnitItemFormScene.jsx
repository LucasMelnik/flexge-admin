import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../../core/form/Button';
import ItemFormContainer from '../../../../item/components/ItemFormContainer';
import Card from '../../../../../core/layout/Card';
import Async from '../../../../../core/layout/Async';
import Breadcrumb from '../../../../../core/layout/Breadcrumb';

const UnitItemFormScene = props => (
  <div>
    <Breadcrumb
      fetching={props.fetching}
      crumbs={[
        {
          text: `Course - ${props.module.course.name}`,
          link: '/v2/modules',
        },
        {
          text: `Module - ${props.module.name}`,
          link: `/v2/modules/${props.module.id}/details`,
        },
        {
          text: `Unit - ${props.unit.name}`,
          link: `/v2/modules/${props.module.id}/units/${props.unit.id}`,
        },
        {
          text: 'New item',
        }
      ]}
    />
    <Card
      title="New Item"
      actions={
        <Button
          icon="fa-arrow-left"
          label="Back"
          onClick={() => props.onBack()}
        />
      }
    >
      <Async fetching={props.fetching}>
        {props.unit.id && (
          <ItemFormContainer
            itemId={props.itemId}
            disabled={localStorage.role === 'ADMIN' ? false : props.unit.createdBy !== localStorage.id}
            itemsTypeUrl={`unit-types/${props.unit.type.id}/item-types`}
            endpointUrl={`units/${props.unit.id}/items`}
            order={props.itemOrder}
            onSaveSuccess={props.onBack}
          />
        )}
      </Async>
    </Card>
  </div>
);

UnitItemFormScene.propTypes = {
  unit: PropTypes.object.isRequired,
  module: PropTypes.object.isRequired,
  itemOrder: PropTypes.number.isRequired,
  onBack: PropTypes.func.isRequired,
  itemId: PropTypes.string,
  reviewId: PropTypes.string,
  fetching: PropTypes.bool,
};

UnitItemFormScene.defaultProps = {
  itemId: null,
  reviewId: null,
  fetching: false,
};

export default UnitItemFormScene;
