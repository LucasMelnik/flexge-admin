import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import { green500, red500, blue500, yellow500 } from 'material-ui/styles/colors';
import MyReviewListFilterContainer from './MyReviewListFilterContainer';
import Separator from '../../../core/layout/Separator';
import Divider from '../../../core/layout/Divider';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';

const MyReviewList = props => (
  <Paper>
    <MyReviewListFilterContainer />
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
            label: 'Reviewed By',
            path: 'review.reviewedBy.name',
          },
          {
            label: 'Status',
            path: 'review.status',
            render: (row) => {
              if (row.review.status === 'PENDING') {
                return (
                  <div>
                    {row.review.status}
                    <FontIcon
                      className="material-icons"
                      style={{ verticalAlign: 'middle', color: yellow500 }}
                    >
                      av_timer
                    </FontIcon>
                  </div>
                );
              } else if (row.review.status === 'REVIEWED') {
                return (
                  <div>
                    {row.review.status}
                    <FontIcon
                      className="material-icons"
                      style={{ verticalAlign: 'middle', color: blue500 }}
                    >
                      rate_review
                    </FontIcon>
                  </div>
                );
              } else if (row.review.status === 'DONE') {
                return (
                  <div>
                    {row.review.status}
                    <FontIcon
                      className="material-icons"
                      style={{ color: green500, verticalAlign: 'middle' }}
                    >
                      check
                    </FontIcon>
                  </div>
                );
              }
              return (
                <div>
                  {row.review.status}
                  <FontIcon
                    className="material-icons"
                    style={{ verticalAlign: 'middle', color: red500 }}
                  >
                    warning
                  </FontIcon>
                </div>
              );
            },
          },
        ]}
        rows={props.unitsAndReviews}
        allowActionValidator={row => !row.review.id}
        selectable
        onSelect={row => (row.review.status === 'REVIEWED' || row.review.status === 'DONE') && browserHistory.push(`/modules/${row.unit.module.id}/units/${row.unit.id}/reviews/${row.review.id}`)}
        onSend={row => props.onSendToReview(row.unit)}
      />
    </Async>
  </Paper>
);

MyReviewList.propTypes = {
  onSendToReview: PropTypes.func,
  unitsAndReviews: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetching: PropTypes.bool,
};

MyReviewList.defaultProps = {
  onSendToReview: null,
};

export default MyReviewList;
