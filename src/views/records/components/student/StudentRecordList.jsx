import React from 'react';
import PropTypes from 'prop-types';
import round from 'lodash/round';
import moment from 'moment';
import Table from '../../../../core/form/Table';
import LinearProgress from '../../../../core/layout/LinearProgress';
import Tag from '../../../../core/layout/Tag';

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
          sort: true,
          width: '130px',
          render: value => value >= 0 ? round(value, 1).toFixed(1) : 'N/A',
        },
        {
          label: 'Current Level',
          path: 'currentEnglishLevel',
          sort: true,
          width: '110px',
          render: value => value >= 0 ? round(value, 1).toFixed(1) : 'N/A',
        },
        {
          label: 'Study Quality',
          path: 'studyQualityScore',
          sort: true,
          width: '110px',
          render: value => value != null ? round(value, 1).toFixed(1) : 'N/A',
        },
        {
          label: 'Current Course',
          path: 'course.name',
          sort: true,
          width: '200px',
          render: (cell, row) => row.initialEnglishLevel != null ? (
            <div style={{ display: 'flex' }}>
              <span
                style={{
                  width: '40px',
                  textAlign: 'right',
                }}
              >
                {cell}
              </span>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  maxWidth: '65%',
                  marginLeft: 10,
                }}
              >
                <LinearProgress
                  color={row.coursePercentage >= 100 ? 'green' : 'blue'}
                  value={row.coursePercentage}
                />
              </div>
            </div>
          ) : 'N/A',
        },
        {
          label: 'Week Time',
          path: 'weekStudiedTime',
          sort: true,
          width: '110px',
          render: value => value ? moment.duration(value, 'seconds').format('hh:mm', { trim: false }) : 'N/A',
        },
        {
          label: 'Total Time',
          path: 'totalStudiedTime',
          sort: true,
          width: '110px',
          render: value => value ? moment.duration(value, 'seconds').format('hh:mm', { trim: false }) : 'N/A',
        },
        {
          label: 'Last Studied',
          path: 'lastStudy',
          sort: true,
          width: '120px',
          render: (cell, row) => {
            if (row.lastStudy) {
              const now = moment();
              const lastStudy = moment(row.lastStudy);
              const diff = moment.duration(lastStudy.diff(now));
              if (diff.days() < -10) {
                return (
                  <Tag color="red">
                    {diff.humanize(true)}
                  </Tag>
                );
              }
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
          width: '90px',
        },
      ]}
      rows={props.students}
      selectable
      onSelect={row => row.initialEnglishLevel >= 0 && props.onSelect(row)}
    />
  </div>
);

StudentRecordList.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    lastStudy: PropTypes.string,
    coursePercentage: PropTypes.number,
    totalStudiedTime: PropTypes.number,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default StudentRecordList;
