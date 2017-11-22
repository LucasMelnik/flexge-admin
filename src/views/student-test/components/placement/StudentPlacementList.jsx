import React from 'react';
import PropTypes from 'prop-types';
import Async from '../../../../core/layout/Async';
import Table from '../../../../core/form/Table';
import Button from '../../../../core/form/Button';
import StudentPlacementItemList from './StudentPlacementItemList';

const StudentPlacementList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Started at',
        path: 'startedAt',
        srt: true,
      },
      {
        label: 'Completed at',
        path: 'completedAt',
      },
      {
        label: 'Reached Level',
        path: 'reachedLevel.level',
      },
      {
        label: 'Stop Reason',
        path: 'stopReason',
      },
      {
        label: 'Actions',
        width: '70px',
        render: (cell, row) => {
          return (
            <Button
              icon="delete"
              onClick={() => props.onDelete(row)}
            />
          );
        },
      },
    ]}
    rows={props.placements}
    expandableComponent={(row) => (
      <StudentPlacementItemList
        studentId={row.student}
        placementTestId={row.id}
        items={row.answeredItems}
      />
    )}
  />
);

StudentPlacementList.propTypes = {
  placements: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default StudentPlacementList;
