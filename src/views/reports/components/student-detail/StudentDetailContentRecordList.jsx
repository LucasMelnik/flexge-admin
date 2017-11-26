import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { formatTimeFromSeconds } from '../../../../core/util';
import Table from '../../../../core/form/Table';

const StudentDetailContentRecordList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Name',
        path: 'name',
        sort: true,
        render: (value, row) => (row.name ? row.name : moment(row.startedAt).format('DD/MM/YYYY HH:mm')),
      },
      {
        label: 'Time',
        render: (value, row) => {
          if (row.studiedTime) {
            return formatTimeFromSeconds(row.studiedTime);
          }
        },
      },
      {
        label: 'Score',
        path: 'score',
      },
      {
        label: 'Correct',
        render: (value, row) => {
          if (row.unititemresults) {
            let wrong = 0;
            row.unititemresults.forEach((item) => {
              if (!item.correct) {
                wrong += 1;
              }
            });
            return `${row.unititemresults.length - wrong}/${row.unititemresults.length}`;
          }
        },
      },
      {
        label: 'Read count',
        path: 'readCount',
      },
      {
        label: 'Record count',
        path: 'recordCount',
      },
      {
        label: 'Repeat count',
        path: 'repeatCount',
      },
      {
        label: 'Listen count',
        path: 'listenCount',
      },
      {
        label: 'Translate count',
        path: 'translateCount',
      },
    ]}
    rows={props.contents}
  />
);

StudentDetailContentRecordList.propTypes = {
  contents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default StudentDetailContentRecordList;
