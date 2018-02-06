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
        render: (value, row) => ({
          children: value,
          props: {
            style: {
              backgroundColor: row.disabledForStudent ? '#eee' : '#fff',
            },
          },
        }),
      },
      {
        label: 'Group',
        path: 'group',
        width: '6%',
        sort: true,
        render: (value, row) => ({
          children: value,
          props: {
            style: {
              backgroundColor: row.disabledForStudent ? '#eee' : '#fff',
            },
          },
        }),
      },
      {
        label: 'Order',
        path: 'order',
        width: '6%',
        sort: true,
        render: (value, row) => ({
          children: value,
          props: {
            style: {
              backgroundColor: row.disabledForStudent ? '#eee' : '#fff',
            },
          },
        }),
      },
      {
        label: 'Name',
        path: 'name',
        width: '25%',
        sort: true,
        render: (value, row) => ({
          children: value,
          props: {
            style: {
              backgroundColor: row.disabledForStudent ? '#eee' : '#fff',
            },
          },
        }),
      },
      {
        label: 'Description',
        path: 'description',
        // width: '25%',
        render: (value, row) => ({
          children: value,
          props: {
            style: {
              backgroundColor: row.disabledForStudent ? '#eee' : '#fff',
            },
          },
        }),
      },
      {
        label: 'Academic Plan',
        path: 'academicPlan.name',
        width: '10%',
        render: (value, row) => ({
          children: value,
          props: {
            style: {
              backgroundColor: row.disabledForStudent ? '#eee' : '#fff',
            },
          },
        }),
      },
      {
        label: 'Points',
        path: 'readingPoints',
        width: '120px',
        render: (value, row) => ({
          children: (
            <div>
              <span>L: {row.listeningPoints || 0} / {row.availableListeningPoints || 0}</span>
              <br />
              <span>R: {row.readingPoints || 0} / {row.availableReadingPoints || 0}</span>
              <br />
              <span>W: {row.writingPoints || 0} / {row.availableWritingPoints || 0}</span>
              <br />
              <span>S: {row.speakingPoints || 0} / {row.availableSpeakingPoints || 0}</span>
            </div>
          ),
          props: {
            style: {
              backgroundColor: row.disabledForStudent ? '#eee' : '#fff',
            },
          },
        }),
      },
      {
        label: 'Units count',
        path: 'unitsCount',
        width: '8%',
        render: (value, row) => ({
          children: value,
          props: {
            style: {
              backgroundColor: row.disabledForStudent ? '#eee' : '#fff',
            },
          },
        }),
      },
      {
        label: 'Actions',
        path: 'action',
        width: '105px',
        render: (cell, row) => ({
          children: (
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
          ),
          props: {
            style: {
              backgroundColor: row.disabledForStudent ? '#eee' : '#fff',
            },
          },
        }),
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
    disabledForStudent: PropTypes.bool,
    availableReadingPoints: PropTypes.number,
    availableSpeakingPoints: PropTypes.number,
    availableListeningPoints: PropTypes.number,
    availableWritingPoints: PropTypes.number,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ModuleList;
