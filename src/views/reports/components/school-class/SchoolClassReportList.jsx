import React from 'react';
import PropTypes from 'prop-types';
import Async from '../../../../core/layout/Async';
import Table from '../../../../core/form/Table';

const SchoolClassReportList = props => (
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
          label: 'Name',
          path: 'name',
        },
        {
          label: 'School',
          path: 'school.name',
        },
        {
          label: 'Teacher',
          path: 'teacher.name',
        },
        {
          label: 'Number Students',
          path: 'studentsCount',
        },
        {
          label: 'Media Study Quality',
        },
        {
          label: 'Last any student access',
        },
        {
          label: 'Status',
        },
      ]}
      rows={props.schoolClasses}
    />
  </Async>
);

SchoolClassReportList.propTypes = {
  schoolClasses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    teacher: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default SchoolClassReportList;
