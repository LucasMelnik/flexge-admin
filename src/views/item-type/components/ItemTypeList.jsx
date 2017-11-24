import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const ItemTypeList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Name',
        path: 'name',
        sort: true,
      },
      {
        label: 'Placement',
        path: 'allowedForPlacementTest',
        width: '120px',
        render: (cell) => {
          return cell ? 'Yes' : 'No';
        },
      },
      {
        label: 'Mastery',
        path: 'allowedForMasteryTest',
        width: '120px',
        render: (cell) => {
          return cell ? 'Yes' : 'No';
        },
      },
      {
        label: 'Time',
        path: 'defaultTime',
        width: '90px',
      },
      {
        label: 'Placement Time',
        path: 'defaultPlacementTestTime',
        width: '150px',
      },
      {
        label: 'Mastery Time',
        path: 'defaultMasteryTestTime',
        width: '150px',
      },
      {
        label: 'Actions',
        path: 'action',
        width: '85px',
        render: (cell, row) => {
          return (
            <div>
              <Button
                icon="delete"
                onClick={() => props.onDelete(row)}
              />
              {' '}
              <Button
                icon="edit"
                onClick={() => browserHistory.push(`/item-types/${row.id}`)}
              />
            </div>
          );
        },
      },
    ]}
    rows={props.items}
  />
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
