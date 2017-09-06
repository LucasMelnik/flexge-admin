import React from 'react';
import PropTypes from 'prop-types';
import Async from '../../../../core/layout/Async';
import Table from '../../../../core/form/Table';
import IconButton from '../../../../core/form/IconButton';
import StudentPlacementItemList from './StudentPlacementItemList';

const StudentPlacementList = props => (
  <Async fetching={props.fetching}>
    <Table
      columns={[
        {
          label: 'ID',
          path: 'id',
          isKey: true,
          hidden: true,
        },
        {
          label: 'Started at',
          path: 'startedAt',
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
          label: 'Actions',
          width: '70',
          render: (cell, row) => {
            return (
              <IconButton
                icon="fa-trash"
                onClick={() => props.onDelete(row)}
              />
            );
          },
        },
      ]}
      rows={props.placements}
      expandable
      expandableComponent={(row) => (
        <StudentPlacementItemList
          studentId={row.student}
          placementTestId={row.id}
          items={row.answeredItems}
        />
      )}
    />
  </Async>
);

StudentPlacementList.propTypes = {
  placements: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default StudentPlacementList;
