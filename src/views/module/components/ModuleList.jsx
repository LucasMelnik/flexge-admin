import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';

const ModuleList = props => (
  <Paper
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
            label: 'Description',
            path: 'description',
          },
          {
            label: 'Course',
            path: 'course.name',
          },
          {
            label: 'Academic Plan',
            path: 'academicPlan.name',
          },
        ]}
        rows={props.modules}
        selectable
        onSelect={row => browserHistory.push(`/modules/${row.id}`)}
        onDelete={row => props.onDelete(row)}
      />
    </Async>
  </Paper>
);

ModuleList.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    course: PropTypes.object.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ModuleList;
