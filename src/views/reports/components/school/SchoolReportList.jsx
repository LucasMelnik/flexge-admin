import React from 'react';
import PropTypes from 'prop-types';
import Async from '../../../../core/layout/Async';
import Table from '../../../../core/form/Table';

const SchoolList = props => (
  <Async fetching={props.fetching}>
    <Table
      columns={[
        {
          label: 'ID',
          path: 'id',
          isKey: true,
          hidden: true,
        },
        {
          label: 'Name',
          path: 'name',
        },
        {
          label: 'Company',
          path: 'company.name',
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
      rows={props.schools}
      selectable
      onSelect={row => console.log(row)}
    />
  </Async>
);

SchoolList.propTypes = {
  schools: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default SchoolList;
