import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import replace from 'lodash/replace';
import MyReviewListFilterContainer from './MyReviewListFilterContainer';
import Separator from '../../../core/layout/Separator';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';
import StatusItem from '../../../core/layout/StatusItem';

const typeWithImage =  [
  'PRESENTATION',
  'SINGLE_CHOICE_IMAGE',
  'SINGLE_CHOICE_KIDS',
  'GAP_FILL_IMAGE',
  'GAP_FILL_LETTER',
  'VOCABULARY',
  'PHONEME',
  'TRUE_FALSE_KIDS',
  'VOCABULARY_GAME',
  'MEMORY_GAME',
  'CONNECTING_DOTS',
  'SINGLE_CHOICE_GAME',
];

const MyReviewList = props => (
  <div>
    <MyReviewListFilterContainer />
    <Separator />
    <Table
      fetching={props.fetching}
      columns={[
        {
          label: 'Name',
          path: 'name',
          sort: true,
        },
        {
          label: 'Course',
          path: 'module.course.name',
          width: '80px',
          sort: true,
        },
        {
          label: 'Module',
          path: 'module.name',
          width: '150px',
          sort: true,
        },
        {
          label: 'Unit Type',
          path: 'type.name',
          width: '105px',
          sort: true,
        },
        {
          label: 'Unit creator',
          path: 'createdBy.name',
          width: '105px',
        },
        {
          label: 'Reviewed By',
          path: 'review.reviewedBy.name',
          width: '105px',
        },
        {
          label: 'Status Content',
          path: 'review.status',
          sort: true,
          width: '115px',
          render: (cell, row) => cell && (
            <StatusItem
              color={{
                PENDING: '#ef8c3b',
                REVIEWED: '#1188FF',
                DONE: '#009687',
                'NOT SENT TO REVIEW': '#758C98',
                'AWAITING FORMAT REVIEW': '#758C98',
              }[row.review.statusFormat !== 'APPROVED' && row.review.status !== 'NOT SENT TO REVIEW' ? 'AWAITING FORMAT REVIEW' : row.review.status]}
              text={row.review.statusFormat !== 'APPROVED' && row.review.status !== 'NOT SENT TO REVIEW' ? 'AWAITING FORMAT REVIEW' : row.review.status}
            />
          ),
        },
        {
          label: 'Status format',
          path: 'review.statusFormat',
          sort: true,
          width: '115px',
          render: (cell,row) => cell && (
            <StatusItem
              color={{
                PENDING: '#ef8c3b',
                PENDING_REVIEW: '#ef8c3b',
                APPROVED: '#009687',
                NOT_APPROVED: '#FF5233',
                DONE: '#009687',
              }[row.review.statusFormat]}
              text={replace(row.review.statusFormat, '_', ' ')}
            />
          ),
        },
        {
          label: 'Status image',
          path: 'review.statusImage',
          sort: true,
          width: '115px',
          render: (cell, row) => {
            if (row.type.itemsType.find(itemType => typeWithImage.find(type => type === itemType.key))) {
              return (
                <StatusItem
                  color={{
                    NOT_SEND_TO_REVIEW: '#758C98',
                    PENDING_REVIEW: '#ef8c3b',
                    APPROVED: '#009687',
                    NOT_APPROVED: '#FF5233',
                  }[row.review.statusImage || 'NOT_SEND_TO_REVIEW']}
                  text={replace(row.review.statusImage || 'NOT_SEND_TO_REVIEW', '_', ' ')}
                />
              );
            }
            return 'N/A';
          },
        },
        {
          label: 'Final Status',
          path: 'review.finalStatus',
          sort: true,
          width: '115px',
          render: (cell, row) => cell && (
            <StatusItem
              color={{
                PENDING: '#ef8c3b',
                APPROVED: '#009687',
                NOT_APPROVED: '#FF5233',
              }[row.review.finalStatus || 'PENDING']}
              text={replace(row.review.finalStatus || 'PENDING', '_', ' ')}
            />
          ),
        },
        {
          label: 'Actions',
          path: 'action',
          width: localStorage.role === 'ADMIN' ? '100px' : '70px',
          render: (cell, row) => {
            if (localStorage.role === 'CONTENT_ADMIN' && !row.review.id) {
              return (
                <Button
                  icon="export"
                  onClick={() => props.onSendToReview(row)}
                />
              );
            } else if (
              localStorage.role === 'ADMIN' &&
              row.review.status === 'DONE' &&
              row.review.statusFormat === 'APPROVED' &&
              row.review.finalStatus !== 'APPROVED'
            ) {
              return (
                <div>
                  <Button
                    icon="like"
                    onClick={() => props.onFinalReview(row.review.id, row.id, 'APPROVED')}
                  />
                  {' '}
                  <Button
                    icon="dislike"
                    onClick={() => props.onFinalReview(row.review.id, row.id, 'NOT_APPROVED')}
                  />
                </div>
              );
            }
            return null;
          },
        },
      ]}
      rows={props.unitsAndReviews}
      selectable
      onSelect={row => (row.review.statusFormat === 'NOT_APPROVED' || row.review.status === 'REVIEWED' || row.review.status === 'PENDING' || row.review.status === 'DONE' || localStorage.role === 'ADMIN') && row.review.id && browserHistory.push(`/modules/${row.module.id}/units/${row.id}/reviews/${row.review.id}`)}
    />
  </div>
);

MyReviewList.propTypes = {
  onSendToReview: PropTypes.func.isRequired,
  onFinalReview: PropTypes.func.isRequired,
  unitsAndReviews: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default MyReviewList;
