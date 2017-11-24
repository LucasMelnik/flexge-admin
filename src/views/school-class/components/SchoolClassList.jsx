import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const SchoolClassList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Name',
        path: 'name',
      },
      {
        label: 'School',
        path: 'school.name',
      },
      {
        label: 'Teacher',
        path: 'teacher.name',
      },
      {
        label: 'Number Students',
        path: 'studentCount',
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
                onClick={() => browserHistory.push(`${props.baseUrl}/classes/${row.id}`)}
              />
            </div>
          );
        },
      },
    ]}
    rows={props.classes}
    selectable
    onSelect={row => browserHistory.push(`${props.baseUrl}/classes/${row.id}/details`)}
  />
);

SchoolClassList.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    school: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  baseUrl: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SchoolClassList;
