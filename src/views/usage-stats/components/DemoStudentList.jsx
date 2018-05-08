import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import { formatTimeFromSeconds } from '../../../core/util';

const DemoStudentList = props => (
  <div>
    <Table
      fetching={props.fetching}
      columns={[
        {
          label: 'ID',
          path: 'id',
        },
         {
          label: 'Name',
          path: 'name',
        },
        {
          label: 'School',
          path: 'schoolClass.school.name',
          defaultSortOrder: 'ascend',
          sort: true,
        },
        {
          label: 'School Class',
          path: 'schoolClass.name',
        },
        {
          label: 'Studied Time',
          path: 'hours',
          width: '150px',
          sort: true,
          align: 'center',
          render: value => formatTimeFromSeconds(value, 'hh:mm'),
        },
      ]}
      rows={props.students}
    />
    <small>{props.students.filter(s => s.hours).length} active students.</small>
  </div>
);

DemoStudentList.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default DemoStudentList;
