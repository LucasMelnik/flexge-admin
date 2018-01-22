import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import moment from 'moment';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const ReactivateStudentList = props => (
  <Table
    fetching={props.fetching}
    columns={[
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
        label: 'School',
        path: 'schoolClass.school.name',
      },
      {
        label: 'School Class',
        path: 'schoolClass.name',
      },
      {
        label: 'Removed',
        path: 'removedAt',
        render: value => value ? moment(value).format('DD/MM/YYYY HH:mm') : '',
      },
      {
        label: 'Actions',
        patch: 'action',
        width: '125px',
        render: (cell, row) => (
          <div>
            <Button
              icon="edit"
              onClick={() => browserHistory.push(`reactivate-student/${row.id}`)}
            />
          </div>
        ),
      },
    ]}
    rows={props.students}
  />
);

ReactivateStudentList.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};


export default ReactivateStudentList;
