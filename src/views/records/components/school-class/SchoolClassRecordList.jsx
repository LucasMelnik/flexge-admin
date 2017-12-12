import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import round from 'lodash/round';
import Table from '../../../../core/form/Table';

const SchoolClassRecordList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Class',
        path: 'name',
        sort: true,
        defaultSortOrder: 'ascend',
      },
      {
        label: 'Teacher',
        path: 'teacher.name',
        sort: true,
      },
      {
        label: 'Number of Students',
        path: 'students',
        sort: true,
      },
      {
        label: 'Study Quality Average',
        path: 'averageStudyQuality',
        render: value => value && round(value, 1).toFixed(1),
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
    rows={props.schoolClasses}
    selectable
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
