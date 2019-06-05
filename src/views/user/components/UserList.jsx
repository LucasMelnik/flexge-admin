import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const UserList = props => (
  <Table
    pagination={{ pageSize: 25 }}
    fetching={props.fetching}
    columns={[
      ...[
        {
          label: 'Name',
          path: 'name',
          sort: true,
          defaultSortOrder: 'ascend',
        },
        {
          label: 'Email',
          path: 'email',
          sort: true,
        },
        {
          label: 'Role',
          path: 'role',
          sort: true,
        },
      ],
      ...props.type === 'DISTRIBUTOR' ? [{
        label: 'Distributor',
        path: 'distributor.name',
        sort: true,
      }] : [],
      ...props.type === 'COMPANY' ? [
        {
          label: 'Company',
          path: 'company.name',
          sort: true,
        },
        {
          label: 'School',
          path: 'school.name',
          sort: true,
        },
      ] : [],
      ...[
        {
          label: 'Actions',
          path: 'action',
          width: '105px',
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
                  onClick={() => browserHistory.push(`${props.baseUrl}/${row.id}`)}
                />
              </div>
            );
          },
        },
      ]
    ]}
    rows={props.users}
  />
);

UserList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    role: PropTypes.string.isRequired,
  })).isRequired,
  type: PropTypes.oneOf(['ADMIN', 'DISTRIBUTOR', 'COMPANY']).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  baseUrl: PropTypes.string.isRequired,
};

export default UserList;
