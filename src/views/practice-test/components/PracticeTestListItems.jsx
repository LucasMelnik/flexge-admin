import React from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import { formatTimeFromSeconds } from '../../../core/util';
import Button from '../../../core/form/Button';
import Select from '../../../core/form/Select';
import Table from '../../../core/form/Table';
import ItemFormContainer from '../../item/components/ItemFormContainer';

const PracticeTestListItems = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Order',
        path: 'order',
        width: '75px',
        render: (cell, row) => (
          <Select
            label="Order"
            value={row.order}
            onChange={order => props.onOrderChange(row.id, row.item.id, order)}
            options={range(1, 11).map(value => ({
              label: value.toString(),
              value,
            }))}
          />
        ),
      },
      {
        label: 'Text',
        path: 'item.text',
      },
      {
        label: 'Translate',
        path: 'item.translation',
      },
      {
        label: 'Type',
        path: 'item.type.name',
        width: '150px',
      },
      {
        label: 'Time',
        path: 'item.time',
        width: '105px',
        render: (cell, row) => formatTimeFromSeconds(row.item.time),
      },
      {
        label: 'Actions',
        path: 'action',
        width: '70px',
        render: (cell, row) => {
          return (
            <Button
              icon="delete"
              onClick={() => props.onDelete(row)}
            />
          );
        },
      },
    ]}
    rows={props.items}
    expandable
    expandableComponent={(row) => (
      <ItemFormContainer
        itemId={row.item.id}
        itemsTypeUrl="/item-types?query[allowedForPlacementTest]=true"
        endpointUrl={`practice-test-items/${row.id}/items`}
        order={row.order}
        showPostPhrase={false}
        onSaveSuccess={props.onSaveSuccess}
        isTestItem
      />
    )}
  />
);

PracticeTestListItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    practiceTest: PropTypes.string,
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSaveSuccess: PropTypes.func.isRequired,
  onOrderChange: PropTypes.func.isRequired,
};

export default PracticeTestListItems;
