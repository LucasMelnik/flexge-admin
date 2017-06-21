import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';

const UnitToReviewList = props => (
  <Paper>
    <Async fetching={props.fetching}>
      <Table
        columns={[
          {
            label: 'Name',
            path: 'unit.name',
          },
          {
            label: 'Module',
            path: 'unit.module.name',
          },
          {
            label: 'Created By',
            path: 'review.createdBy.name',
          },
          {
            label: 'Status',
            path: 'review.status',
          },
          {
            label: 'Reviewed By',
            path: 'review.reviewedBy.name',
          },
        ]}
        rows={props.reviews}
        selectable
        onSelect={row => browserHistory.push(`/modules/${row.unit.module.id}/units/${row.unit.id}/items/review`)}
      />
    </Async>
  </Paper>
);

UnitToReviewList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    status: PropTypes.string,
    createdBy: PropTypes.object,
    unit: PropTypes.shape({
      name: PropTypes.string,
      module: PropTypes.object,
      type: PropTypes.object,
      difficulty: PropTypes.string,
      order: PropTypes.number,
      group: PropTypes.string,
      scoreToPass: PropTypes.number,
      time: PropTypes.number,
      createdBy: PropTypes.string,
    }),
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default UnitToReviewList;
