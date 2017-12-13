import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Table from '../../../../core/form/Table';
import Tag from '../../../../core/layout/Tag';

const StudentDetailDateRecordList = props => (
  <Table
    showTableCount={false}
    fetching={props.fetching}
    columns={[
      {
        label: 'Date',
        path: 'startedAt',
        render: (value, row) => (row.children && row.children.length && moment(value).format('DD/MM/YYYY')) || moment(value).format('DD/MM/YYYY HH:mm'),
      },
      {
        label: 'Course',
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
            return row.unit.name;
          } else if (row.masteryTest) {
            return row.masteryTest.modulePercentageToActive;
          }
          return '';
        },
      },
      {
        label: 'Type',
        path: 'type',
        render: (value) => {
          switch (value) {
            case 'DEFAULT':
              return 'Your Challenge';
            case 'FIRST_REVIEW':
              return 'First Review';
            case 'SECOND_REVIEW':
              return 'Second Review';
            case 'SIMPLE_REVIEW':
              return 'Simple Review';
            default:
              return '';
          }
        },
      },
      {
        label: 'Studied Time',
        path: 'studiedTime',
        render: value => moment.duration(value, 'seconds').format('hh:mm', { trim: false }),
      },
      {
        label: 'Correct Count',
        path: 'items',
        render: value => value && `${value.filter(item => item.correct).length}/${value.length}`,
      },
      {
        label: 'Score',
        path: 'score',
        render: (value, row) => row.unit && (
          <Tag color={(value || 0) > row.unit.scoreToPass ? 'green' : 'red'}>
            {value || 0} / {row.unit.scoreToPass}
          </Tag>
        ),
      },
      {
        label: 'Points',
        path: 'points',
      },
      {
        label: 'Average SR Score',
        path: 'averageSpeechRecognitionScore',
      },
    ]}
    rows={props.contents}
  />
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
};

export default StudentDetailDateRecordList;
