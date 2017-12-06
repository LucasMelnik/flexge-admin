import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Button from '../../../core/form/Button';
import Table from '../../../core/form/Table';

const ModuleList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Course',
        path: 'course.name',
        width: '6%',
        sort: true,
      },
      {
        label: 'Group',
        path: 'group',
        width: '6%',
        sort: true,
      },
      {
        label: 'Order',
        path: 'order',
        width: '6%',
        sort: true,
      },
      {
        label: 'Name',
        path: 'name',
        width: '25%',
        sort: true,
      },
      {
        label: 'Description',
        path: 'description',
        width: '25%',
      },
      {
        label: 'Academic Plan',
        path: 'academicPlan.name',
        width: '10%',
      },
      {
        label: 'Created By',
        path: 'createdBy.name',
      },
      {
        label: 'Units count',
        path: 'unitsCount',
        width: '8%',
      },
      {
        label: 'Actions',
        path: 'action',
        width: '105px',
        render: (cell, row) => {
          return (
            <div>
              {(localStorage.role === 'ADMIN' || row.createdBy.id === localStorage.id) && (
                <Button
                  icon="delete"
                  onClick={() => props.onDelete(row)}
                />
              )}
              {' '}
              {(localStorage.role === 'ADMIN' || row.createdBy.id === localStorage.id) && (
                <Button
                  icon="edit"
                  onClick={() => browserHistory.push(`/modules/${row.id}`)}
                />
              )}
            </div>
          );
        },
      },
    ]}
    rows={props.modules}
    selectable
    onSelect={row => browserHistory.push(`/modules/${row.id}/details`)}
  />
);

ModuleList.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    course: PropTypes.object.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ModuleList;
