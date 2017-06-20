import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';

const UnitReviewList = props => (
  <Paper>
    <Async fetching={props.fetching}>
      <Table
        columns={[
          {
            label: 'Name',
            path: 'name',
          },
          {
            label: 'Module',
            path: 'module.name',
          },
        ]}
        rows={props.units}
        selectable
        onSelect={row => browserHistory.push(`/units/${row.id}`)}
        onSendReview={row => props.onSendReview(row)}
      />
    </Async>
  </Paper>
);

UnitReviewList.propTypes = {
  units: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
}

export default UnitReviewList;
