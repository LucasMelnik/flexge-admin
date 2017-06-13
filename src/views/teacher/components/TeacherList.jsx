import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';

const TeacherList = props => (
  <Paper>
    <Async fetching={props.fetching}>
      <Table
        columns={[
          {
            label: 'Name',
            path: 'name',
          },
          {
            label: 'Email',
            path: 'email',
          },
          {
            label: 'Company',
            path: 'company',
          },
        ]}
        rows={props.teachers}
        selectable
        onSelect={row => browserHistory.push(`/teachers/${row.id}`)}
        onDelete={row => props.onDelete(row.id)}
      />
    </Async>
  </Paper>
);

TeacherList.propTypes = {
  teachers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TeacherList;
