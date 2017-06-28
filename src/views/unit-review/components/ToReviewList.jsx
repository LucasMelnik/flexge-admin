import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import { red500, blue500, yellow500, green500 } from 'material-ui/styles/colors';
import ToReviewListFilterContainer from './ToReviewListFilterContainer';
import Separator from '../../../core/layout/Separator';
import Divider from '../../../core/layout/Divider';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';

const getIcon = icon => ({
  'NOT SENT TO REVIEW': {
    icon: 'warning',
    color: red500,
  },
  DONE: {
    icon: 'check',
    color: green500,
  },
  PENDING: {
    icon: 'av_timer',
    color: yellow500,
  },
  REVIEWED: {
    icon: 'rate_review',
    color: blue500,
  },
})[icon];

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
          {
            label: 'Reviewed By',
            path: 'review.reviewedBy.name',
          },
          {
            label: 'Status',
            path: 'review.status',
            render: (row) => {
              const icon = getIcon(row.review.status);
              return (
                <div>
                  {row.review.status}
                  <FontIcon
                    className="material-icons"
                    style={{ verticalAlign: 'middle', color: icon.color }}
                  >
                    {icon.icon}
                  </FontIcon>
                </div>
              );
            },
          },
        ]}
        rows={props.unitsAndReviews}
        selectable
        onSelect={row => (row.review.status === 'PENDING' || row.review.status === 'REVIEWED') && browserHistory.push(`/modules/${row.unit.module.id}/units/${row.unit.id}/reviews/${row.review.id}`)}
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
