import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Async from '../../../core/layout/Async';
import Table from '../../../core/form/Table';
import IconButton from '../../../core/form/IconButton';

const ItemTypeList = props => (
  <Async fetching={props.fetching}>
    <Table
      columns={[
        {
          label: 'ID',
          path: 'id',
          isKey: true,
          hidden: true,
        },
        {
          label: 'Name',
          path: 'name',
        },
        {
          label: 'Placement',
          path: 'allowedForPlacementTest',
          width: '120',
          render: (cell) => {
            return cell ? 'Yes' : 'No';
          },
        },
        {
          label: 'Mastery',
          path: 'allowedForMasteryTest',
          width: '120',
          render: (cell) => {
            return cell ? 'Yes' : 'No';
          },
        },
        {
          label: 'Time',
          path: 'defaultTime',
          width: '90',
        },
        {
          label: 'Placement Time',
          path: 'defaultPlacementTestTime',
          width: '150',
        },
        {
          label: 'Mastery Time',
          path: 'defaultMasteryTestTime',
          width: '150',
        },
        {
          label: 'Actions',
          path: 'action',
          width: '120',
          render: (cell, row) => {
            return (
              <div>
                <IconButton
                  icon="fa-trash"
                  onClick={() => props.onDelete(row)}
                />
                {' '}
                <IconButton
                  icon="fa-edit"
                  onClick={() => browserHistory.push(`/item-types/${row.id}`)}
                />
              </div>
            );
          },
        },
      ]}
      rows={props.items}
    />
  </Async>
);

ItemTypeList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ItemTypeList;
