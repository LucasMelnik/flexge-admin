import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import IconButton from '../../../core/form/IconButton';
import Async from '../../../core/layout/Async';
import Table from '../../../core/form/Table';

const ModuleList = props => (
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
            label: 'Course',
            path: 'course.name',
            width: '10%',
          },
          {
            label: 'Group',
            path: 'group',
            width: '10%',
          },
          {
            label: 'Order',
            path: 'order',
            width: '10%',
          },
          {
            label: 'Name',
            path: 'name',
          },
          {
            label: 'Description',
            path: 'description',
            rowColumnStyle: {
              textOverflow: 'none',
              paddingTop: 5,
              paddingBottom: 5,
              paddingRight: 5,
              whiteSpace: 'normal',
              textAlign: 'justify',
              lineHeight: '18px',
            }
          },
          {
            label: 'Academic Plan',
            path: 'academicPlan.name',
          },
          {
            label: 'Created By',
            path: 'createdBy.name',
          },
          {
            label: 'Units count',
            path: 'unitsCount',
            width: '12%',
          },
          {
            label: 'Actions',
            path: 'action',
            width: '120',
            render: (cell, row) => {
              return (
                <div>
                  {row.createdBy.id === localStorage.id && (
                    <IconButton
                      icon="fa-trash"
                      onClick={() => props.onDelete(row)}
                    />
                  )}
                  {' '}
                  {row.createdBy.id === localStorage.id && (
                    <IconButton
                      icon="fa-edit"
                      onClick={() => browserHistory.push(`/v2/modules/${row.id}`)}
                    />
                  )}
                </div>
              );
            },
          },
        ]}
        rows={props.modules}
        selectable
        onSelect={row => browserHistory.push(`/v2/modules/${row.id}/details`)}
      />
  </Async>
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
