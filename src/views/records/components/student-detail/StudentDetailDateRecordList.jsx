import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Tooltip } from 'antd';
import moment from 'moment';
import round from 'lodash/round';
import get from 'lodash/get';
import Table from '../../../../core/form/Table';
import Tag from '../../../../core/layout/Tag';
import Button from '../../../../core/form/Button';
import Icon from '../../../../core/layout/Icon';
import ColumnSeparator from '../../../../core/layout/ColumnSeparator';
import StudentDetailDateRecordListFilter from './StudentDetailDateRecordListFilter';

const StudentDetailDateRecordList = props => (
  <div>
    <StudentDetailDateRecordListFilter
      values={props.filterValues}
      onChange={props.onChange}
      onFilter={props.onFilter}
    />
    <Table
      showTableCount={false}
      fetching={props.fetching}
      columns={[
        {
          label: 'Date',
          path: 'startedAt',
          render: (value, row) => (row.children && row.children.length && <b>{moment(value).format('DD/MM/YYYY')}</b>) || (
            <React.Fragment>
              {row.studentAccess && (
                <Tooltip
                  placement="top"
                  title={(row.studentAccess.os === 'ios' || row.studentAccess.os === 'android') ? 'Studied on App' : 'Studied on Computer'}
                >
                  {(row.studentAccess.os === 'ios' || row.studentAccess.os === 'android') ? (
                    <Icon name="mobile" />
                  ) : (
                    <Icon name="desktop" />
                  )}
                  <ColumnSeparator size="xs" />
                </Tooltip>
              )}
              {moment(value).format('DD/MM/YYYY HH:mm')}
            </React.Fragment>
          ),
        },
        {
          label: 'Course',
          align: 'center',
          render: (cell, row) => {
            if (row.unit) {
              return row.unit.module.course.name;
            } else if (row.masteryTest) {
              return row.masteryTest.module.course.name;
            }
            return '';
          },
        },
        {
          label: 'Module',
          render: (cell, row) => {
            if (row.unit) {
              return row.unit.module.name;
            } else if (row.masteryTest) {
              return row.masteryTest.module.name;
            }
            return '';
          },
        },
        {
          label: 'Unit',
          render: (cell, row) => {
            if (row.unit) {
              return (
                <Link
                  target="_blank"
                  to={`/contents/${row.unit.id}/details`}
                >
                  {row.unit.name}
                </Link>
              );
            } else if (row.masteryTest) {
              return `${row.masteryTest.modulePercentageToActive}% Module`;
            }
            return '';
          },
        },
        {
          label: 'Type',
          path: 'type',
          align: 'center',
          render: (value, row) => {
            if (value === 'MASTERY_TEST') {
              return 'MT';
            }
            if (row.unit && row.unit.module.academicPlan.key === 'KIDS') {
              switch (value) {
                case 'DEFAULT':
                  return 'YC';
                case 'FIRST_REVIEW':
                  return 'FR';
                case 'SECOND_REVIEW':
                  return 'SR';
                case 'SIMPLE_REVIEW':
                  return 'SI';
                default:
                  return '';
              }
            }
            if (row.unit && row.unit.module.academicPlan.key === 'FUND_II') {
              switch (value) {
                case 'DEFAULT':
                  return 'YC';
                case 'FIRST_REVIEW':
                  return moment(row.startedAt).year() <= 2018 ? 'FR' : 'RW';
                case 'SECOND_REVIEW':
                  return moment(row.startedAt).year() <= 2018 ? 'SR' : '-';
                case 'SIMPLE_REVIEW':
                  return moment(row.startedAt).year() <= 2018 ? 'SI' : 'RC';
                default:
                  return '';
              }
            }
          },
        },
        {
          label: 'Studied Time',
          path: 'studiedTime',
          align: 'center',
          render: (value, row) => row.children ? (
            <b>{moment.duration(value, 'seconds').format('hh:mm', { trim: false })}</b>
          ) : moment.duration(value, 'seconds').format('hh:mm', { trim: false }),
        },
        // {
        //   label: 'Correct Count',
        //   path: 'items',
        //   render: value => value && `${value.filter(item => item.correct).length} / ${value.length}`,
        // },
        {
          label: 'Score',
          path: 'score',
          align: 'center',
          render: (value, row) => {
            if (get(row, 'unit.module.academicPlan.key', '') === 'KIDS') {
              if (row.unit && row.completedAt) {
                return (
                  <Tag color={(row.points || (row.score && row.type === 'SIMPLE_REVIEW')) ? 'green' : 'red'}>
                    {value || 0}
                  </Tag>
                );
              }
              if ((row.unit || row.masteryTest) && !row.completedAt) {
                return (
                  <span style={{ color: 'red' }}>
                    Not finished
                  </span>
                );
              }
            } else {
              if (row.unit && row.completedAt) {
                return (
                  <Tag color={(value || 0) >= row.unit.scoreToPass ? 'green' : 'red'}>
                    {value || 0} / {row.unit.scoreToPass}
                  </Tag>
                );
              }
              if (row.masteryTest && row.completedAt) {
                return (
                  <Tag color={(value || 0) >= row.scoreToPass ? 'green' : 'red'}>
                    {value || 0} / {row.scoreToPass}
                  </Tag>
                );
              }
              if ((row.unit || row.masteryTest) && !row.completedAt) {
                return (
                  <span style={{ color: 'red' }}>
                    Not finished
                  </span>
                );
              }
            }
            return null;
          },
        },
        {
          label: 'Points',
          path: 'points',
          align: 'center',
          render: (value, row) => row.children ? <b>{value}</b> : value,
        },
        {
          label: 'Average SR Score',
          path: 'averageSpeechRecognitionScore',
          align: 'center',
          render: value => value && round(value),
        },
        {
          label: 'Repeat',
          path: 'repeatCount',
          align: 'center',
        },
        {
          label: 'Record',
          path: 'recordCount',
          align: 'center',
        },
        {
          label: 'Listen',
          path: 'listenCount',
          align: 'center',
        },
        {
          label: 'Actions',
          path: 'action',
          width: '75px',
          align: 'center',
          render: (value, row) => (!row.children && !row.docType) && (
            <Button
              icon="bars"
              onClick={() => props.onDetailExecutionResult(row.id)}
            />
          ),
        },
      ]}
      rows={props.contents}
    />
  </div>
);

StudentDetailDateRecordList.propTypes = {
  contents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    unit: PropTypes.shape({
      name: PropTypes.string,
      module: PropTypes.shape({
        name: PropTypes.string,
        course: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
    }),
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDetailExecutionResult: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  filterValues: PropTypes.shape({}).isRequired,
};

export default StudentDetailDateRecordList;
