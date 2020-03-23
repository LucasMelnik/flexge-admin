import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core/form/Table';
import Button from '../../../../core/form/Button';
import { browserHistory } from 'react-router';

const ItemByWordCountLimitList = props => (
  <Table
    rowKey="item.id"
    fetching={props.fetching}
    onChange={props.onChange}
    pagination={props.pagination}
    columns={[
      {
        label: 'Module',
        path: 'name',
        width: '20%',
      },
      {
        label: 'Unit',
        path: 'unit.name',
        width: '25%',
      },
      {
        label: 'Order',
        path: 'unitItem.order',
        width: '50px',
      },
      {
        label: 'Group',
        path: 'unitItem.group',
        width: '70px',
        render: value => ['', 'Default', 'First Review', 'Second Review'][value]
      },
      {
        label: 'Text',
        path: 'item.text',
      },
      {
        label: 'Words',
        path: 'item.wordCount',
        width: '70px',
      },
      {
        label: 'Actions',
        path: 'action',
        width: '80px',
        align: 'center',
        render: (cell, row) => (
          <Button
            icon="edit"
            onClick={() => browserHistory.push(`/modules/${row.id}/units/${row.unit.id}/items`)}
          />
        ),
      },
    ]}
    rows={props.items}
    selectable
  />
);

ItemByWordCountLimitList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    unit: PropTypes.PropTypes.shape({}).isRequired,
  })).isRequired,
  pagination: PropTypes.shape({
    current: PropTypes.number
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default ItemByWordCountLimitList;
