import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const PlacementTestLevelList = props => (
  <Table
    loading={props.fetching}
    columns={[
      {
        label: 'Level',
        path: 'level',
        width: '120px',
        sort: true,
      },
      {
        label: 'Course',
        path: 'course.name',
        sort: true,
      },
      {
        label: 'Placement % Error',
        path: 'placementPercentageError',
      },
      {
        label: 'Actions',
        path: 'action',
        width: '85',
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
                onClick={() => browserHistory.push(`/placement-test-levels/${row.id}`)}
              />
            </div>
          );
        },
      },
    ]}
    rows={props.levels}
  />
);

PlacementTestLevelList.propTypes = {
  levels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    placementPercentageError: PropTypes.number,
    course: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PlacementTestLevelList;
