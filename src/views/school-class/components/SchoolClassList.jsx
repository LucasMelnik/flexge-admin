import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { browserHistory } from 'react-router';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const SchoolClassList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'School',
        path: 'school.name',
      },
      {
        label: 'Class',
        path: 'name',
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
        label: 'Start',
        path: 'start',
        render: value => value && moment(value).format('DD/MM/YYYY'),
      },
      {
        label: 'End',
        path: 'end',
        render: value => value && moment(value).format('DD/MM/YYYY'),
      },
      {
        label: 'Actions',
        path: 'action',
        width: '105px',
        render: (cell, row) => localStorage.role !== 'TEACHER' && (
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
        ),
      },
    ]}
    rows={props.classes}
    selectable
    onSelect={row => browserHistory.push(`${props.baseUrl}/classes/${row.id}/details`)}
    onChange={props.onChange}
    pagination={props.pagination}
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
  onChange: PropTypes.func.isRequired,
  pagination: PropTypes.shape({}).isRequired,
};

export default SchoolClassList;
