import React from 'react';
import PropTypes from 'prop-types';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';

const SchoolClassList = props => (
  <Async fetching={props.fetching}>
    <Table
      columns={[
        {
          label: 'Name',
          path: 'name',
        },
        {
          label: 'Teacher',
          path: 'teacher.name',
          labelWhenNull: 'This class has no Teacher',
        },
      ]}
      rows={props.classes}
      onSelect={row => props.onSelect(row.id)}
      onDelete={row => props.onDelete(row)}
      selectable
    />
  </Async>
);

SchoolClassList.propTypes = {
  fetching: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  classes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SchoolClassList;
