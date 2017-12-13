import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';
import Table from '../../../../core/form/Table';
import LinearProgress from '../../../../core/layout/LinearProgress';
import Tag from '../../../../core/layout/Tag';
import Icon from '../../../../core/layout/Icon';

const AbilityProgressColumn = (value, label) => value !== undefined && (
  <div
    style={{
      width: 250,
    }}
  >
    <span>{value}% </span>
    <div
      style={{
        display: 'inline-block',
        width: '50%',
      }}
    >
      <LinearProgress
        value={value}
        showInfo={false}
      />
    </div>
    <span> {label}</span>
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
            return <b style={{ fontSize: 16 }}>{row.name}</b>;
          } else if (row.docType === 'UNIT') {
            return <b>{row.name}</b>;
          } else if (row.docType === 'MASTERY') {
            return <span><Icon name="file-text" />{' '}<b>Mastery Test for {row.modulePercentageToActive}%</b></span>;
          }
          return moment(row.startedAt).format('DD/MM/YYYY HH:mm');
        },
      },
      {
        label: 'Studied Time',
        path: 'studiedTime',
        render: (value, row) => ({
          children: row.docType === 'MODULE' ? (
            <div>
              <div style={{ display: 'inline-block' }}>
                {AbilityProgressColumn(row.readingProgress, 'Reading')}
                {AbilityProgressColumn(row.speakingProgress, 'Speaking')}
              </div>
              <div style={{ display: 'inline-block' }}>
                {AbilityProgressColumn(row.listeningProgress, 'Listening')}
                {AbilityProgressColumn(row.writingProgress, 'Writing')}
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
        render: (value, row) => {
          if (row.docType === 'UNIT') {
            return {
              children: row.children && row.children.reduce((acc, result) => acc + (result.points || 0), 0),
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
        render: (value, row) => ({
          children: (row.docType === 'UNIT' || row.docType === 'MASTERY') ? (
            <div>To pass: {row.scoreToPass}</div>
          ) : (
            <Tag
              color={row.points ? 'green' : 'red'}
            >
              {value || 0}
            </Tag>
          ),
          props: {
            colSpan: row.docType === 'MODULE' ? 0 : row.docType ? 3 : 1,
          },
        }),
      },
      {
        label: 'Type',
        path: 'type',
        render: (value, row) => {
          let translatedValue = '';
          switch (value) {
            case 'DEFAULT':
              translatedValue = 'Your Challenge';
              break;
            case 'FIRST_REVIEW':
              translatedValue = 'First Review';
              break;
            case 'SECOND_REVIEW':
              translatedValue = 'Second Review';
              break;
            case 'SIMPLE_REVIEW':
              translatedValue = 'Simple Review';
              break;
            default:
              break;
          }
          return {
            children: translatedValue,
            props: {
              colSpan: row.docType && 0,
            },
          };
        },
      },
      // {
      //   label: 'Correct',
      //   path: 'items',
      //   render: (value, row) => ({
      //     children: value && `${value.filter(item => item.correct).length}/${value.length}`,
      //     props: {
      //       colSpan: row.docType && 0,
      //     },
      //   }),
      // },
      {
        label: 'SR',
        path: 'averageSpeechRecognitionScore',
        render: (value, row) => ({
          children: value,
          props: {
            colSpan: row.docType && 0,
          },
        }),
      },
    ]}
    rows={props.contents}
  />
);

StudentDetailContentRecordList.propTypes = {
  contents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default StudentDetailContentRecordList;
