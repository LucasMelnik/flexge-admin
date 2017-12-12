import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';
import Table from '../../../../core/form/Table';
import LinearProgress from '../../../../core/layout/LinearProgress';
import Tag from '../../../../core/layout/Tag';
import Icon from '../../../../core/layout/Icon';

const StudentDetailContentRecordList = props => (
  <Table
    bordered={false}
    showTableCount={false}
    fetching={props.fetching}
    columns={[
      {
        label: 'Name',
        path: 'id',
        render: (value, row) => {
          if (row.docType === 'MODULE') {
            return <b style={{ fontSize: 22 }}>{row.name}</b>;
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
              <div
                style={{
                  width: 300,
                }}
              >
                <span>{row.readingProgress}% </span>
                <div
                  style={{
                    display: 'inline-block',
                    width: '70%',
                  }}
                >
                  <LinearProgress
                    value={row.readingProgress}
                    showInfo={false}
                  />
                </div>
                <span> Reading</span>
              </div>
              <div
                style={{
                  width: 300,
                }}
              >
                <span>{row.speakingProgress}% </span>
                <div
                  style={{
                    display: 'inline-block',
                    width: '70%',
                  }}
                >
                  <LinearProgress
                    value={row.speakingProgress}
                    showInfo={false}
                  />
                </div>
                <span> Speaking</span>
              </div>
              <div
                style={{
                  width: 300,
                }}
              >
                <span>{row.listeningProgress}% </span>
                <div
                  style={{
                    display: 'inline-block',
                    width: '70%',
                  }}
                >
                  <LinearProgress
                    value={row.listeningProgress}
                    showInfo={false}
                  />
                </div>
                <span> Listening</span>
              </div>
              <div
                style={{
                  width: 300,
                }}
              >
                <span>{row.writingProgress}% </span>
                <div
                  style={{
                    display: 'inline-block',
                    width: '70%',
                  }}
                >
                  <LinearProgress
                    value={row.writingProgress}
                    showInfo={false}
                  />
                </div>
                <span> Writing</span>
              </div>
            </div>
          ) : (
            <b>{moment.duration(row.studiedTime, 'seconds').format('hh:mm:ss', { trim: false })}</b>
          ),
          props: {
            colSpan: row.docType === 'MODULE' ? 5 : 1,
          },
        }),
      },
      {
        label: 'Points',
        path: 'points',
        render: value => ({
          children: value,
        }),
      },
      {
        label: 'Score',
        path: 'score',
        render: (value, row) => ({
          children: row.docType !== 'MODULE' ? (
            <div>To pass: {row.scoreToPass}</div>
          ) : (
            <Tag
              color={row.points ? 'green' : 'red'}
            >
              {value}
            </Tag>
          ),
          props: {
            colSpan: row.docType === 'MODULE' ? 0 : row.docType !== 'MODULE' ? 4 : 1,
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
      {
        label: 'Correct',
        path: 'items',
        render: (value, row) => ({
          children: value && `${value.filter(item => item.correct).length}/${value.length}`,
          props: {
            colSpan: row.docType && 0,
          },
        }),
      },
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
