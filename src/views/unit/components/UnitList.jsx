import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';

const UnitList = props => (
  <Paper>
    <Async fetching={props.fetching}>
      <Table
        columns={[
          {
            label: 'Name',
            path: 'name',
          },
          {
            label: 'Difficulty',
            path: 'difficulty',
          },
          {
            label: 'Abilities',
            path: 'abilities',
          },
          {
            label: 'Module',
            path: 'module.name',
          },
        ]}
        rows={props.units}
        selectable
        onSelect={row => browserHistory.push(`/modules/${row.module.id}/units/${row.id}`)}
        onDelete={row => props.onDelete(row)}
      />
    </Async>
  </Paper>
);

UnitList.propTypes = {
  units: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UnitList;
