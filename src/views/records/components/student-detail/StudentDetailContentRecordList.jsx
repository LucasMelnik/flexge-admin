import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';
import Table from '../../../../core/form/Table';
import LinearProgress from '../../../../core/layout/LinearProgress';
import Alert from '../../../../core/layout/Alert';

const StudentDetailContentRecordList = props => (
  <Table
    showTableCount={false}
    fetching={props.fetching}
    columns={[
      {
        label: 'Name',
        path: 'id',
        render: (value, row) => {
          if (row.docType === 'MODULE' || row.docType === 'UNIT') {
            return row.name;
          } else if (row.docType === 'MASTERY') {
            return `Mastery Test for ${row.modulePercentageToActive}%`;
          }
          return moment(row.startedAt).format('DD/MM/YYYY HH:mm');
        },
      },
      {
        label: 'Studied Time',
        path: 'studiedTime',
        render: (value, row) => ({
          children: moment.duration(row.studiedTime, 'seconds').format('hh:mm:ss', { trim: false }),
        }),
      },
      {
        label: 'Score',
        path: 'score',
        render: (value, row) => ({
          children: row.docType === 'MODULE' ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ width: 200 }}>
                <p>Module</p>
                <LinearProgress
                  value={row.moduleProgress}
                />
              </div>
              <div style={{ width: 200 }}>
                <p>Reading</p>
                <LinearProgress
                  value={row.readingProgress}
                />
              </div>
              <div style={{ width: 200 }}>
                <p>Speaking</p>
                <LinearProgress
                  value={row.speakingProgress}
                />
              </div>
              <div style={{ width: 200 }}>
                <p>Listening</p>
                <LinearProgress
                  value={row.listeningProgress}
                />
              </div>
              <div style={{ width: 200 }}>
                <p>Writing</p>
                <LinearProgress
                  value={row.writingProgress}
                />
              </div>
            </div>
          ) : (
            row.scoreToPass ? (
              <div>Score to pass: {row.scoreToPass}</div>
            ) : (
              <Alert
                title={row.points ? `Your score ${value} - Approved` : `Your score ${value} - Failed`}
                type={row.points ? 'success' : 'error'}
              />
            )
          ),
          props: {
            colSpan: row.children && 4,
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
              colSpan: row.children && 0,
            },
          };
        },
      },
      {
        label: 'Points',
        path: 'points',
        render: (value, row) => ({
          children: value,
          props: {
            colSpan: row.children && 0,
          },
        }),
      },
      {
        label: 'Average SR',
        path: 'averageSpeechRecognitionScore',
        render: (value, row) => ({
          children: value,
          props: {
            colSpan: row.children && 0,
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
