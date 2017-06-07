import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Card from '../../../core/layout/Card';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';

const StudentList = props => (
  <Card
    flexible
  >
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
        ]}
        rows={props.students}
        selectable
        onSelect={row => browserHistory.push(`/students/${row.id}`)}
        onDelete={row => props.onDelete(row.id)}
      />
    </Async>
  </Card>
);

StudentList.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default StudentList;
