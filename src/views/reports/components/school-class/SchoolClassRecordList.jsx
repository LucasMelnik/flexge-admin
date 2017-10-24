import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core-ant/Table';
import moment from 'moment';

const SchoolClassRecordList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Name',
        path: 'name',
        sort: true,
      },
      {
        label: 'School',
        path: 'school.name',
        sort: true,
      },
      {
        label: 'Teacher',
        path: 'teacher.name',
        sort: true,
      },
      {
        label: 'Number Students',
        path: 'students',
        sort: true,
      },
      {
        label: 'Media Study Quality',
      },
      {
        label: 'Last any student access',
        path: 'lastAccessAt',
        render: (cell, row) => {
          if (row.lastAccessAt) {
            return `${moment(row.lastAccessAt).format('LLL')}`;
          }
          return '-';
        },
      },
      {
        label: 'Status',
      },
    ]}
    dataSource={props.schoolClasses}
    onSelect={props.onSelect}
  />
);

SchoolClassRecordList.propTypes = {
  schoolClasses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    teacher: PropTypes.shape({
      name: PropTypes.string,
    }),
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default SchoolClassRecordList;
