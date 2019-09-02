import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const SchoolList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Company',
        path: 'company.name',
        width: 250,
      },
      {
        label: 'School',
        path: 'name',
        sort: true,
      },
      {
        label: 'Actions',
        path: 'action',
        width: '105px',
        render: (cell, row) => (
          <div>
            <Button
              icon="delete"
              onClick={() => props.onDelete(row)}
            />
            {' '}
            <Button
              icon="edit"
              onClick={() => browserHistory.push(`${props.baseUrl}/schools/${row.id}`)}
            />
          </div>
        ),
      },
    ]}
    rows={props.schools}
    selectable
    onSelect={row => browserHistory.push(`${props.baseUrl}/schools/${row.id}/details`)}
    onChange={props.onChange}
    pagination={props.pagination}
  />
);

SchoolList.propTypes = {
  schools: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  baseUrl: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  pagination: PropTypes.shape({}).isRequired,
};

export default SchoolList;
