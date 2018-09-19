import React from 'react';
import PropTypes from 'prop-types';
import round from 'lodash/round';
import get from 'lodash/get';
import moment from 'moment';
import { Tooltip } from 'antd';
import Table from '../../../../core/form/Table';
import LinearProgress from '../../../../core/layout/LinearProgress';
import Tag from '../../../../core/layout/Tag';
import Icon from '../../../../core/layout/Icon';
import StudentRecordListFilter from './StudentRecordListFilter';

const StudentRecordList = props => (
  <div>
    <StudentRecordListFilter
      values={props.filterValues}
      onChange={props.onChange}
      onFilter={props.onFilter}
    />
    <Table
      fetching={props.fetching}
      columns={[
        {
          label: 'Name',
          path: 'name',
          sort: true,
          defaultSortOrder: 'ascend',
          render: (value, row) => (
            <div>
              {value}
              {row.deletedAt && (
                <span
                  style={{
                    color: '#ff000066',
                    fontSize: 11,
                    marginLeft: 10,
                  }}
                >
                  Disabled at {moment(row.deletedAt).format('DD/MM/YY HH:mm')}
                </span>
              )}
            </div>
          ),
        },
        {
          label: 'English Level',
          path: 'initialEnglishLevel',
          width: '100px',
          render: (value, row) => (row.initialEnglishLevel === null || row.initialEnglishLevel === undefined) ? 'N/A' : (
            <Tooltip
              position="top"
              title="Initial Level -> Current Level"
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                {row.initialEnglishLevel >= 0 && round(row.initialEnglishLevel, 1).toFixed(1)}
                <Icon
                  name="arrow-right"
                  style={{
                    fontSize: 16,
                  }}
                />
                {row.currentEnglishLevel >= 0 && round(row.currentEnglishLevel, 1).toFixed(1)}
              </div>
            </Tooltip>
          ),
        },
        {
          label: 'Study Quality',
          path: 'studyQualityScore',
          sort: true,
          width: '130px',
          align: 'center',
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
                  value={round(row.coursePercentage || 0, 1)}
                />
              </div>
            </div>
          ) : 'N/A',
        },
        ...get(props.filterValues, 'isCustomPeriod', false) ? [
          {
            label: 'Custom Period',
            path: 'weekStudiedTime',
            sort: true,
            width: '150px',
            render: value => value ? moment.duration(value, 'seconds').format('hh:mm', { trim: false }) : 'N/A',
          },
        ] : [
          {
            label: 'Week Time',
            path: 'weekStudiedTime',
            sort: true,
            width: '115px',
            render: value => value ? moment.duration(value, 'seconds').format('hh:mm', { trim: false }) : 'N/A',
          },
          {
            label: 'Last Week Time',
            path: 'lastWeekStudiedTime',
            sort: true,
            width: '145px',
            render: value => value ? moment.duration(value, 'seconds').format('hh:mm', { trim: false }) : 'N/A',
          },
        ],
        {
          label: 'Total Time',
          path: 'totalStudiedTime',
          sort: true,
          width: '115px',
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
      onSelect={row => (!row.deletedAt && row.initialEnglishLevel >= 0) && props.onSelect(row)}
    />
  </div>
);

StudentRecordList.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    lastStudy: PropTypes.string,
    deletedAt: PropTypes.string,
    coursePercentage: PropTypes.number,
    totalStudiedTime: PropTypes.number,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  filterValues: PropTypes.shape({}).isRequired,
};

export default StudentRecordList;
