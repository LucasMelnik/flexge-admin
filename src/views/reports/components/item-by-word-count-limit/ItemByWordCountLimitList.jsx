import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core/form/Table';
import Button from '../../../../core/form/Button';
import { Link } from 'react-router';
import round from 'lodash/round';

const ItemByWordCountLimitList = props => (
  <Table
    rowKey="item.id"
    fetching={props.fetching}
    onChange={props.onChange}
    pagination={props.pagination}
    columns={[
      {
        label: 'Module - Unit',
        path: 'name',
        width: '20%',
        render: (value, row) => (
          <span>
            {value}
            <br/>
            <b>({row.unit.order}) {row.unit.name}</b>
          </span>
        )
      },
      {
        label: 'Item Order',
        path: 'unitItem.order',
        width: '50px',
      },
      {
        label: 'Item Group',
        path: 'unitItem.group',
        width: '70px',
        render: value => ['', 'Default', 'First Review', 'Second Review'][value]
      },
      {
        label: 'Type',
        path: 'item.type.name',
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
        label: 'Attempt Count',
        path: 'item.executionStats.attemptCount',
        width: '50px',
      },
      {
        label: 'Attempt Error %',
        path: 'item.executionStats.errorPercentage',
        width: '50px',
        render: value => round(value, 2)
      },
      {
        label: 'Actions',
        path: 'action',
        width: '80px',
        align: 'center',
        render: (cell, row) => (
          <Link to={`/modules/${row.id}/units/${row.unit.id}/items`} target="_blank">
            <Button
              icon="edit"
            />
          </Link>
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
