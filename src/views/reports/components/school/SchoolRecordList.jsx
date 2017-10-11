import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core-ant/Table';

const SchoolRecordList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Name',
        path: 'name',
        sort: true,
      },
      {
        label: 'Company',
        path: 'company.name',
        sort: true,
      },
      {
        label: 'Number School Classes',
        path: 'schoolclasses',
      },
      {
        label: 'Media Study Quality',
      },
      {
        label: 'Last any student access',
      },
      {
        label: 'Status',
      },
    ]}
    dataSource={props.schools}
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
