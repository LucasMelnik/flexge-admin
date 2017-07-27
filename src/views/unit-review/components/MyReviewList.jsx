import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import replace from 'lodash/replace';
import MyReviewListFilterContainer from './MyReviewListFilterContainer';
import Separator from '../../../core/layout/Separator';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';

const MyReviewList = props => (
  <Paper>
    <Async fetching={props.fetching}>
      <div
        style={{
          textAlign: 'right',
          fontSize: 13,
        }}
      >
        {(props.unitsAndReviews && props.unitsAndReviews.length === 1) ?
          (
            `${props.unitsAndReviews.length} record found.`
          ) : (
            `${props.unitsAndReviews.length} records found.`
          )
        }
      </div>
      <MyReviewListFilterContainer />
      <Separator />
      <Table
        columns={[
          {
            label: 'Name',
            path: 'unit.name',
          },
          {
            label: 'Course',
            path: 'unit.module.course.name',
            width: 80,
          },
          {
            label: 'Module',
            path: 'unit.module.name',
          },
          {
            label: 'Unit Type',
            path: 'unit.type.name',
          },
          {
            label: 'Reviewed By',
            path: 'review.reviewedBy.name',
          },
          {
            label: 'Status content',
            path: 'review.status',
            render: row => (
              <div
                style={{
                  color: '#fff',
                  padding: 10,
                  display: 'inline-block',
                  fontWeight: 'bold',
                  borderRadius: 5,
                  backgroundColor: {
                    PENDING: '#ef8c3b',
                    REVIEWED: '#1188FF',
                    DONE: '#009687',
                    'NOT SENT TO REVIEW': '#758C98',
                  }[row.review.status],
                }}
              >
                {row.review.status}
              </div>
            ),
          },
          {
            label: 'Status format',
            path: 'review.statusFormat',
            render: row => (
              <div
                style={{
                  color: '#fff',
                  padding: 10,
                  display: 'inline-block',
                  fontWeight: 'bold',
                  borderRadius: 5,
                  backgroundColor: {
                    PENDING: '#ef8c3b',
                    PENDING_REVIEW: '#ef8c3b',
                    APPROVED: '#009687',
                    NOT_APPROVED: '#FF5233',
                    DONE: '#009687',
                  }[row.review.statusFormat],
                }}
              >
                {replace(row.review.statusFormat, '_', ' ')}
              </div>
            ),
          },
        ]}
        rows={props.unitsAndReviews}
        allowActionValidator={row => !row.review.id}
        selectable
        onSelect={row => (row.review.statusFormat === 'NOT_APPROVED' || row.review.status === 'REVIEWED' || row.review.status === 'DONE' || localStorage.role === 'ADMIN') && row.review.id && browserHistory.push(`/modules/${row.unit.module.id}/units/${row.unit.id}/reviews/${row.review.id}`)}
        onSend={localStorage.role !== 'ADMIN' ? (row => props.onSendToReview(row.unit)) : null}
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
