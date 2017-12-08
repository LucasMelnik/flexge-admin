import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import round from 'lodash/round';
import Table from '../../../../core/form/Table';

const StudentDetailDateRecordList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Date',
        path: 'startedAt',
        render: (value, row) => (row.children && row.children.length && moment(value).format('DD/MM/YYYY')) || moment(value).format('DD/MM/YYYY HH:mm'),
      },
      {
        label: 'Course',
        path: 'unit.module.course.name',
      },
      {
        label: 'Module',
        path: 'unit.module.name',
      },
      {
        label: 'Unit',
        path: 'unit.name',
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
        render: value => moment.duration(value, 'seconds').format('mm:ss', { trim: false }),
      },
      {
        label: 'Correct Count',
        path: 'items',
        render: value => value && `${value.filter(item => item.correct).length}/${value.length}`,
      },
      {
        label: 'Score',
        path: 'score',
        render: (value, row) => value && `${value}/${row.unit.scoreToPass}`,
      },
      {
        label: 'Points',
        path: 'points',
      },
      {
        label: 'Average SR Score',
        path: 'averageSR',
        render: (value, row) => {
          if (row.items) {
            const scores = row.items.reduce((acc, item) => [
              ...acc,
              ...item.attempts.map(attempt => !Number.isNaN(parseInt(attempt.answer, 10)) ? parseInt(attempt.answer, 10) : 0)],
            []);
            return round(scores.reduce((acc, score) => acc + score, 0) / scores.length);
          }
          return '';
        },
      },

    ]}
    rows={props.contents}
  />
);

StudentDetailDateRecordList.propTypes = {
  contents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
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
