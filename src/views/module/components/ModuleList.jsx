import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Paper from '../../../core/layout/Paper';
import Separator from '../../../core/layout/Separator';
import Divider from '../../../core/layout/Divider';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';
import ModuleListFilterContainer from './ModuleListFilterContainer';

const ModuleList = props => (
  <Paper
    flexible
  >
    <ModuleListFilterContainer />
    <Async fetching={props.fetching}>
      <div>
        <Separator />
        <Divider />
        <Table
          columns={[
            {
              label: 'Group',
              path: 'group',
              width: 80,
            },
            {
              label: 'Order',
              path: 'order',
              width: 80,
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
              label: 'Course',
              path: 'course.name',
              width: 70,
            },
            {
              label: 'Academic Plan',
              path: 'academicPlan.name',
              width: 140,
            },
            {
              label: 'Created By',
              path: 'createdBy.name',
              width: 120,
            },
            {
              label: 'Units count',
              path: 'unitsCount',
              width: 150,
            },
          ]}
          rows={props.modules}
          selectable
          onSelect={row => browserHistory.push(`/modules/${row.id}/units`)}
          onEdit={row => browserHistory.push(`/modules/${row.id}`)}
          onDelete={row => props.onDelete(row)}
        />
      </div>
    </Async>
  </Paper>
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
