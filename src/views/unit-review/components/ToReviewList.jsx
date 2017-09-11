import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import replace from 'lodash/replace';
import ToReviewListFilterContainer from './ToReviewListFilterContainer';
import Separator from '../../../core/layout/Separator';
import Async from '../../../core/layout/Async';
import Table from '../../../core/form/Table';

const ToReviewList = props => (
  <Async fetching={props.fetching}>
    <ToReviewListFilterContainer />
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
          rowColumnStyle: {
            textOverflow: 'none',
            paddingTop: 5,
            paddingBottom: 5,
            paddingRight: 5,
            whiteSpace: 'normal',
            textAlign: 'justify',
            lineHeight: '18px',
          },
        },
        {
          label: 'Course',
          path: 'unit.module.course.name',
        },
        {
          label: 'Module',
          path: 'unit.module.name',
          rowColumnStyle: {
            textOverflow: 'none',
            paddingTop: 5,
            paddingBottom: 5,
            paddingRight: 5,
            whiteSpace: 'normal',
            textAlign: 'justify',
            lineHeight: '18px',
          },
        },
        {
          label: 'Unit Type',
          path: 'unit.type.name',
        },
        {
          label: 'Created By',
          path: 'review.createdBy.name',
        },
        {
          label: 'Status content',
          path: 'review.status',
          render: (cell, row) => (
            <div
              style={{
                color: '#fff',
                padding: 5,
                fontSize: 12,
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
                padding: 5,
                fontSize: 12,
                display: 'inline-block',
                fontWeight: 'bold',
                borderRadius: 5,
                backgroundColor: {
                  PENDING: '#ef8c3b',
                  PENDING_REVIEW: '#ef8c3b',
                  APPROVED: '#009687',
                  NOT_APPROVED: '#FF5233',
                }[row.review.statusFormat],
              }}
            >
              {replace(row.review.statusFormat, '_', ' ')}
            </div>
          ),
        },
        {
          label: 'Status image',
          path: 'review.statusImage',
          render: (cell, row) => {
            if (row.unit.type.itemsType.find(itemType => ['PRESENTATION', 'SINGLE_CHOICE_IMAGE'].find(type => type === itemType.key))) {
              return (
                <div
                  style={{
                    color: '#fff',
                    padding: 5,
                    fontSize: 12,
                    display: 'inline-block',
                    fontWeight: 'bold',
                    borderRadius: 5,
                    backgroundColor: {
                      PENDING: '#ef8c3b',
                      PENDING_REVIEW: '#ef8c3b',
                      APPROVED: '#009687',
                      NOT_APPROVED: '#FF5233',
                    }[row.review.statusImage || 'PENDING'],
                  }}
                >
                  {replace(row.review.statusImage || 'PENDING', '_', ' ')}
                </div>
              );
            }
            return 'N/A';
          }
        },
      ]}
      rows={props.unitsAndReviews}
      selectable
      onSelect={row => (row.review.status === 'PENDING' || row.review.status === 'REVIEWED') && browserHistory.push(`/modules/${row.unit.module.id}/units/${row.unit.id}/reviews/${row.review.id}`)}
    />
  </Async>
);

ToReviewList.propTypes = {
  unitsAndReviews: PropTypes.arrayOf(PropTypes.shape({
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

export default ToReviewList;
