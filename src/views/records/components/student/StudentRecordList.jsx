import React from 'react';
import PropTypes from 'prop-types';
import round from 'lodash/round';
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
          width: '40%',
          defaultSortOrder: 'ascend',
        },
        {
          label: 'Initial Level (PT)',
          path: 'initialEnglishLevel',
          width: '130px',
          render: value => value && round(value, 1).toFixed(1),
        },
        {
          label: 'Current Level',
          path: 'currentEnglishLevel',
          width: '110px',
          render: value => value && round(value, 1).toFixed(1),
        },
        {
          label: 'Study Quality',
          path: 'studyQualityScore',
          width: '110px',
          render: value => value && round(value, 1).toFixed(1),
        },
        {
          label: 'Current Course',
          path: 'course',
          render: (cell, row) => (
            <div style={{ display: 'flex', width: 150 }}>
              {cell}
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  marginLeft: 5,
                }}
              >
                <LinearProgress
                  color={row.coursePercentage > 80 ? 'green' : 'blue'}
                  value={row.coursePercentage}
                />
              </div>
            </div>
          ),
        },
        {
          label: 'Time Studied',
          path: 'totalStudiedTime',
          width: '110px',
          render: value => moment.duration(value, 'seconds').format('hh:mm', { trim: false }),
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
                <div style={{ width: 100 }}>{diff.humanize(true)}</div>
              );
            }
            return (
              <div>-</div>
            );
          },
        },
        {
          label: 'CT Status',
          width: '80px',
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
