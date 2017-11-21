import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const DistributorList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Name',
        path: 'name',
        sort: true,
      },
      {
        label: 'Actions',
        path: 'action',
        width: '85px',
        render: (cell, row) => (
          <div>
            <Button
              icon="edit"
              onClick={() => browserHistory.push(`/distributors/${row.id}`)}
            />
            {' '}
            <Button
              icon="delete"
              onClick={() => props.onDelete(row)}
            />
          </div>
        ),
      },
    ]}
    rows={props.distributors}
    selectable
    onSelect={row => browserHistory.push(`/distributors/${row.id}/details`)}
  />
);

DistributorList.propTypes = {
  distributors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DistributorList;
