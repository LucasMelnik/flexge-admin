import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Table from '../../../../core/form/Table';
import LinearProgress from '../../../../core/layout/LinearProgress';

const StudentRecordList = props => (
  <div>
    <Table
      fetching={props.fetching}
      columns={[
        {
          label: 'Name',
          path: 'name',
          sort: true,
          defaultSortOrder: 'ascend',
        },
        {
          label: 'Initial Level (PT)',
          path: 'initialEnglishLevel',
        },
        {
          label: 'Current Level',
          path: 'currentEnglishLevel',
        },
        {
          label: 'Current Course',
          path: 'course',
          render: (cell, row) => (
            <div>
              <p>{cell}</p>
              <LinearProgress
                color={row.coursePercentage > 80 ? 'green' : 'blue'}
                value={row.coursePercentage}
              />
            </div>
          ),
        },
        {
          label: 'Time Studied',
          path: 'totalStudiedTime',
          render: value => moment.duration(value, 'seconds').format('hh:mm:ss', { trim: false }),
        },
        {
          label: 'Last Studied',
          path: 'lastStudy',
          render: (cell, row) => {
            if (row.lastStudy) {
              const now = moment();
              const lastStudy = moment(row.lastStudy);
              const diff = moment.duration(lastStudy.diff(now));
              return (
                <div>{diff.humanize(true)}</div>
              );
            }
            return (
              <div>-</div>
            );
          },
        },
        {
          label: 'CT Status',
        },
      ]}
      rows={props.students}
      selectable
      onSelect={props.onSelect}
    />
  </div>
);

StudentRecordList.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    lastStudy: PropTypes.string.isRequired,
    coursePercentage: PropTypes.number.isRequired,
    totalStudiedTime: PropTypes.number.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default StudentRecordList;
