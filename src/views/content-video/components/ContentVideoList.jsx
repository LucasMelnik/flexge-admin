import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';
import StatusItem from '../../../core/layout/StatusItem';

const ContentVideoList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Name',
        path: 'name',
        sort: true,
        defaultSortOrder: 'ascend',
      },
      {
        label: 'Course',
        path: 'module.course.name',
      },
      {
        label: 'Module',
        path: 'module.name',
      },
      {
        label: 'Position',
        path: 'group',
        width: '180px',
        render: value => ({
          A: 'Phase 1',
          B: 'Phase 2',
          C: 'Phase 3',
          D: 'Phase 4',
          NO_GROUP: 'End of Module'
        }[value])
      },
      {
        label: 'Status',
        path: 'review.finalStatus',
        width: '180px',
        render: value => (
          <StatusItem
            color={{
              PENDING: '#ef8c3b',
              REVIEWED: '#1188FF',
              APPROVED: '#009687',
            }[value]}
            text={value}
          />
        )
      },
      {
        label: 'Actions',
        path: 'action',
        width: '105px',
        render: (cell, row) => {
          return (
            <div>
              <Button
                icon="delete"
                onClick={() => props.onDelete(row)}
              />
              {' '}
              <Button
                icon="edit"
                onClick={() => browserHistory.push(`/content-videos/${row.id}`)}
              />
            </div>
          );
        },
      },
    ]}
    rows={props.contentVideos}
  />
);

ContentVideoList.propTypes = {
  contentVideos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContentVideoList;
