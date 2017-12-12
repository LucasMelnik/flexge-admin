import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import round from 'lodash/round';
import Table from '../../../../core/form/Table';

const SchoolRecordList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Company',
        path: 'company.name',
        sort: true,
        defaultSortOrder: 'ascend',
      },
      {
        label: 'School',
        path: 'name',
        sort: true,
      },
      {
        label: 'Number School Classes',
        path: 'schoolclasses',
      },
      {
        label: 'Study Quality Average',
        path: 'averageStudyQuality',
        render: value => value && round(value),
      },
      {
        label: 'Last any student access',
        path: 'lastAccessAt',
        render: (cell, row) => {
          if (row.lastAccessAt) {
            return `${moment(row.lastAccessAt).format('LLL')}`;
          }
          return '-';
        },
      },
      {
        label: 'Status',
      },
    ]}
    rows={props.schools}
    selectable
    onSelect={props.onSelect}
  />
);

SchoolRecordList.propTypes = {
  schools: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default SchoolRecordList;
