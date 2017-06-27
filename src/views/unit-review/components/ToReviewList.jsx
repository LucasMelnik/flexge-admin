import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import ToReviewListFilterContainer from './ToReviewListFilterContainer';
import Separator from '../../../core/layout/Separator';
import Divider from '../../../core/layout/Divider';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';

const ToReviewList = props => (
  <Paper>
    <ToReviewListFilterContainer />
    <Separator />
    <Divider />
    <Async fetching={props.fetching}>
      <Table
        columns={[
          {
            label: 'Name',
            path: 'unit.name',
          },
          {
            label: 'Course',
            path: 'unit.module.course.name',
          },
          {
            label: 'Module',
            path: 'unit.module.name',
          },
          {
            label: 'Created By',
            path: 'review.createdBy.name',
          },
        ]}
        rows={props.unitsAndReviews}
        selectable
        onSelect={row => row.review.status === 'PENDING' && browserHistory.push(`/modules/${row.unit.module.id}/units/${row.unit.id}/reviews/${row.review.id}`)}
      />
    </Async>
  </Paper>
);

ToReviewList.propTypes = {
  unitsAndReviews: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    status: PropTypes.string,
    createdBy: PropTypes.object,
    unit: PropTypes.shape({
      name: PropTypes.string,
      module: PropTypes.object,
      type: PropTypes.string,
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

export default ToReviewList;
