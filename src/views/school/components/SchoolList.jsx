import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';

const SchoolList = props => (
  <Paper>
    <Async fetching={props.fetching}>
      <Table
        columns={[
          {
            label: 'Name',
            path: 'name',
          },
          {
            label: 'Company',
            path: 'company.name',
          },
        ]}
        rows={props.schools}
        selectable
        onSelect={row => browserHistory.push(`/schools/${row.id}`)}
        onDelete={row => props.onDelete(row.id)}
      />
    </Async>
  </Paper>
);

SchoolList.propTypes = {
  schools: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default SchoolList;
