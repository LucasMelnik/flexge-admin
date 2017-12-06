import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import replace from 'lodash/replace';
import ToReviewListFilterContainer from './ToReviewListFilterContainer';
import Separator from '../../../core/layout/Separator';
import Table from '../../../core/form/Table';
import StatusItem from '../../../core/layout/StatusItem';

const ToReviewList = props => (
  <div>
    <ToReviewListFilterContainer />
    <Separator />
    <Table
      fetching={props.fetching}
      columns={[
        {
          label: 'Name',
          path: 'unit.name',
          sort: true,
        },
        {
          label: 'Course',
          path: 'unit.module.course.name',
          width: '80px',
          sort: true,
        },
        {
          label: 'Module',
          path: 'unit.module.name',
          sort: true,
        },
        {
          label: 'Unit Type',
          path: 'unit.type.name',
          width: '105px',
          sort: true,
        },
        {
          label: 'Unit creator',
          path: 'unit.createdBy.name',
          width: '105px',
        },
        {
          label: 'Created By',
          path: 'review.createdBy.name',
          width: '105px',
        },
        {
          label: 'Status content',
          path: 'review.status',
          sort: true,
          render: (cell, row) => (
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
          render: (cell, row) => (
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
          render: (cell, row) => {
            if (row.unit.type.itemsType.find(itemType => ['PRESENTATION', 'SINGLE_CHOICE_IMAGE'].find(type => type === itemType.key))) {
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
      ]}
      rows={props.unitsAndReviews}
      selectable
      onSelect={row => (row.review.status === 'PENDING' || row.review.status === 'REVIEWED') && browserHistory.push(`/modules/${row.unit.module.id}/units/${row.unit.id}/reviews/${row.review.id}`)}
    />
  </div>
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
      createdBy: PropTypes.object,
    }),
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default ToReviewList;
