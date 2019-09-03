import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import round from 'lodash/round';
import moment from 'moment';
import 'moment-duration-format';
import Table from '../../../../core/form/Table';
import LinearProgress from '../../../../core/layout/LinearProgress';
import Tag from '../../../../core/layout/Tag';
import Icon from '../../../../core/layout/Icon';
import Button from '../../../../core/form/Button';

const AbilityProgressColumn = (value, label) => value !== undefined && (
  <div
    style={{
      width: 250,
    }}
  >
    <small
      style={{
        display: 'inline-block',
        textAlign: 'right',
        width: 30,
        marginRight: 5,
      }}
    >
      {value}%
    </small>
    <div
      style={{
        display: 'inline-block',
        width: '50%',
      }}
    >
      <LinearProgress
        value={value}
        showInfo={false}
        color={value >= 100 ? 'green' : 'blue'}
      />
    </div>
    <small> {label}</small>
  </div>
);

const StudentDetailContentRecordList = props => (
  <Table
    indentSize={25}
    bordered={false}
    showTableCount={false}
    fetching={props.fetching}
    columns={[
      {
        label: 'Name',
        path: 'id',
        render: (value, row) => {
          if (row.docType === 'MODULE') {
            return (
              <span>
                <b style={{ fontSize: 14 }}>{row.name}</b>
                {' '}
                <Icon name={row.isAvailable ? 'unlock': 'lock'} />
              </span>
            );
          } else if (row.docType === 'UNIT') {
            return (
              <span>
                <Link
                  target="_blank"
                  to={`/contents/${row.id}/details`}
                >
                  <b>{row.name}</b>
                </Link>
                {' '}
                <Icon name={row.isAvailable ? 'unlock': 'lock'} />
              </span>
            );
          } else if (row.docType === 'MASTERY') {
            return (
              <span>
                <Icon name="file-text" />{' '}
                <b>Mastery Test for {row.modulePercentageToActive}%</b>{' '}
                {row.availableAt && !row.failedAt && <Icon name="unlock" />}
                {(row.failedAt || !row.availableAt) && <Icon name="lock" />}
              </span>
            );
          }
          return moment(row.startedAt).format('DD/MM/YYYY HH:mm');
        },
      },
      {
        label: 'Studied Time',
        path: 'studiedTime',
        align: 'center',
        width: '160px',
        render: (value, row) => ({
          children: row.docType === 'MODULE' ? (
            <div>
              <div style={{ display: 'inline-block' }}>
                {AbilityProgressColumn(row.readingProgress || 0, 'Reading')}
                {AbilityProgressColumn(row.speakingProgress || 0, 'Speaking')}
              </div>
              <div style={{ display: 'inline-block' }}>
                {AbilityProgressColumn(row.listeningProgress || 0, 'Listening')}
                {AbilityProgressColumn(row.writingProgress || 0, 'Writing')}
              </div>
            </div>
          ) : (
            <b>{moment.duration(row.studiedTime, 'seconds').format('hh:mm', { trim: false })}</b>
          ),
          props: {
            colSpan: row.docType === 'MODULE' ? 4 : 1,
          },
        }),
      },
      {
        label: 'Points',
        path: 'points',
        align: 'center',
        width: '160px',
        render: (value, row) => {
          if (row.docType === 'UNIT') {
            return {
              children: row.children && (<b>{row.children.reduce((acc, result) => acc + (result.points || 0), 0)}</b>),
            };
          }
          return {
            children: value || 0,
          };
        },
      },
      {
        label: 'Score',
        path: 'score',
        align: 'center',
        width: '160px',
        render: (value, row) => ({
          children: (row.docType === 'UNIT' || row.docType === 'MASTERY') ? (
            <div style={{ textAlign: 'left', fontWeight: 'bold' }}>To pass: {row.scoreToPass}</div>
          ) : (
            row.completedAt ? (
              row.academicPlan && row.academicPlan.key === 'KIDS' ? (
                <Tag color={(row.points || (row.score && row.type === 'SIMPLE_REVIEW')) ? 'green' : 'red'}>
                  {value || 0}
                </Tag>
              ) : (
                <Tag color={(row.points || (row.studentMasteryTest && row.score && row.score >= row.scoreToPass)) ? 'green' : 'red'}>
                  {value || 0}{row.scoreToPass ? ` / ${row.scoreToPass}` : ''}
                </Tag>
              )
            ) : (
              <span style={{ color: 'red' }} >
                Not finished
              </span>
            )
          ),
          props: {
            colSpan: row.docType === 'MODULE' ? 0 : row.docType ? 3 : 1,
          },
        }),
      },
      {
        label: 'Type',
        path: 'type',
        align: 'center',
        width: '50px',
        render: (value, row) => {
          let translatedValue = '';
          if (row.academicPlan && row.academicPlan.key === 'FUND_II') {
            switch (value) {
              case 'DEFAULT':
                translatedValue = 'YC';
                break;
              case 'FIRST_REVIEW':
                if (moment(row.startedAt).year() <= 2018) {
                  translatedValue = 'FR';
                } else {
                  translatedValue = 'RW';
                }
                break;
              case 'SECOND_REVIEW':
                if (moment(row.startedAt).year() <= 2018) {
                  translatedValue = 'SR';
                } else {
                  translatedValue = '-';
                }
                break;
              case 'SIMPLE_REVIEW':
                if (moment(row.startedAt).year() <= 2018) {
                  translatedValue = 'SI';
                } else {
                  translatedValue = 'RC';
                }
                break;
              default:
                break;
            }
          }
          if (row.academicPlan && row.academicPlan.key === 'KIDS') {
            switch (value) {
              case 'DEFAULT':
                translatedValue = 'YC';
                break;
              case 'FIRST_REVIEW':
                translatedValue = 'FR';
                break;
              case 'SECOND_REVIEW':
                translatedValue = 'SR';
                break;
              case 'SIMPLE_REVIEW':
                translatedValue = 'SI';
                break;
              default:
                break;
            }
          }
          return {
            children: translatedValue,
            props: {
              colSpan: row.docType && 0,
            },
          };
        },
      },
      {
        label: 'SR',
        align: 'center',
        path: 'averageSpeechRecognitionScore',
        width: '50px',
        render: (value, row) => row && ({
          children: value && round(value),
          props: {
            colSpan: row.docType && 0,
          },
        }),
      },
      {
        label: 'Repeat',
        path: 'repeatCount',
        align: 'center',
        width: '110px',
        render: (value, row) => row.docType === 'MODULE' ? (
          <b style={{ fontSize: 14 }}>
            {row.children && row.children.reduce((moduleAcc, mod) => (
              moduleAcc + (mod.children ? mod.children.reduce((unitAcc, unit) => (
                unitAcc + (unit.repeatCount || 0)
              ), 0) : 0)
            ), 0)}
          </b>
        ) : row.docType === 'UNIT' ? (
          <b>
            {row.children ? row.children.reduce((acc, unit) => acc + (unit.repeatCount || 0), 0) : 0}
          </b>
        ) : value,
      },
      {
        label: 'Record',
        path: 'recordCount',
        align: 'center',
        width: '110px',
        render: (value, row) => row.docType === 'MODULE' ? (
          <b style={{ fontSize: 14 }}>
            {row.children && row.children.reduce((moduleAcc, mod) => (
              moduleAcc + (mod.children ? mod.children.reduce((unitAcc, unit) => (
                unitAcc + (unit.recordCount || 0)
              ), 0) : 0)
            ), 0)}
          </b>
        ) : row.docType === 'UNIT' ? (
          <b>
            {row.children ? row.children.reduce((acc, unit) => acc + (unit.recordCount || 0), 0) : 0}
          </b>
        ) : value,
      },
      {
        label: 'Listen',
        path: 'listenCount',
        align: 'center',
        width: '100px',
        render: (value, row) => row.docType === 'MODULE' ? (
          <b style={{ fontSize: 14 }}>
            {row.children && row.children.reduce((moduleAcc, mod) => (
              moduleAcc + (mod.children ? mod.children.reduce((unitAcc, unit) => (
                unitAcc + (unit.listenCount || 0)
              ), 0) : 0)
            ), 0)}
          </b>
        ) : row.docType === 'UNIT' ? (
          <b>
            {row.children ? row.children.reduce((acc, unit) => acc + (unit.listenCount || 0), 0) : 0}
          </b>
        ) : value,
      },
      {
        label: 'Actions',
        path: 'action',
        width: '75px',
        align: 'center',
        render: (value, row) => {
          if (!row.children && !row.docType) {
            return (
              <Button
                icon="bars"
                onClick={() => props.onDetailExecutionResult(row.id)}
              />
            );
          }
          return null;
        },
      },
    ]}
    rows={props.contents}
  />
);

StudentDetailContentRecordList.propTypes = {
  contents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    docType: PropTypes.string,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDetailExecutionResult: PropTypes.func.isRequired,
};

export default StudentDetailContentRecordList;
