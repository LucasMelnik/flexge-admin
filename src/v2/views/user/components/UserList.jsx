import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Async from '../../../core/layout/Async';
import Table from '../../../core/form/Table';
import IconButton from '../../../core/form/IconButton';

const DistributorList = props => (
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
          label: 'School',
          path: '',
          render: (cell, row) => {
            return (
              <div>
                {row.school && (row.role === 'COMPANY_MANAGER' ? 'All' : row.school ? row.school.name : '-')}
              </div>
            );
          },
        },
        {
          label: 'Email',
          path: 'email',
        },
        {
          label: 'Role',
          path: 'role',
        },
        {
          label: 'Company',
          width: '120',
          path: '',
          render: (cell, row) => {
            return (
              <div
                style={{
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 25,
                }}
              >
                {row.role === 'COMPANY_MANAGER' || row.role === 'ADMIN' ? 'X' : '-'}
              </div>
            );
          },
        },
        {
          label: 'School',
          width: '120',
          path: '',
          render: (cell, row) => {
            return (
              <div
                style={{
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 25,
                }}
              >
                {row.role === 'SCHOOL_MANAGER' || row.role === 'ADMIN' ? 'X' : '-'}
              </div>
            );
          },
        },
        {
          label: 'Teacher',
          width: '120',
          path: '',
          render: (cell, row) => {
            return (
              <div
                style={{
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 25,
                }}
              >
                {row.role === 'TEACHER' || row.role === 'ADMIN' ? 'X' : '-'}
              </div>
            );
          },
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
                  onClick={() => browserHistory.push(`/v2/companies/${row.company.id}/users/${row.id}`)}
                />
              </div>
            );
          },
        },
      ]}
      rows={props.users}
      selectable
      onSelect={() => console.log('Select')}
    />
  </Async>
);

DistributorList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    school: PropTypes.object,
    company: PropTypes.object.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DistributorList;
