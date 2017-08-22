import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import replace from 'lodash/replace';
import MyReviewListFilterContainer from './MyReviewListFilterContainer';
import Separator from '../../../core/layout/Separator';
import Async from '../../../core/layout/Async';
import Table from '../../../core/form/Table';
import IconButton from '../../../core/form/IconButton';

const MyReviewList = props => (
  <Async fetching={props.fetching}>
    <MyReviewListFilterContainer />
    <Separator />
    <Table
      columns={[
        {
          label: 'id',
          path: 'id',
          isKey: true,
          hidden: true,
        },
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
          width: '235',
          render: (cell, row) => (
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
                  'AWAITING FORMAT REVIEW': '#758C98',
                }[row.review.statusFormat !== 'APPROVED' && row.review.status !== 'NOT SENT TO REVIEW' ? 'AWAITING FORMAT REVIEW' : row.review.status],
              }}
            >
              {row.review.statusFormat !== 'APPROVED' && row.review.status !== 'NOT SENT TO REVIEW' ? 'AWAITING FORMAT REVIEW' : row.review.status}
            </div>
          ),
        },
        {
          label: 'Status format',
          path: 'review.statusFormat',
          render: (cell, row) => (
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
        {
          label: 'Actions',
          path: 'action',
          width: '70',
          render: (cell, row) => {
            if (localStorage.role !== 'ADMIN' && !row.review.id) {
              return (
                <IconButton
                  icon="fa-send"
                  onClick={() => props.onSendToReview(row.unit)}
                />
              );
            }
            return null;
          },
        },
      ]}
      rows={props.unitsAndReviews}
      selectable
      onSelect={row => (row.review.statusFormat === 'NOT_APPROVED' || row.review.status === 'REVIEWED' || row.review.status === 'DONE' || localStorage.role === 'ADMIN') && row.review.id && browserHistory.push(`/v2/modules/${row.unit.module.id}/units/${row.unit.id}/reviews/${row.review.id}`)}
    />
</Async>
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
