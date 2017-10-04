import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Async from '../../../../core/layout/Async';
import Table from '../../../../core/form/Table';

const StudentMasteryList = props => (
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
          label: 'Module',
          path: 'masteryTest.module.name',
        },
        {
          label: 'Percentage',
          path: 'masteryTest.modulePercentageToActive',
        },
        {
          label: 'Available Since',
          path: 'availableAt',
          render: cell => moment(cell).format('DD/MM/YYYY hh:mm:ss'),
        },
        {
          label: 'Last Failed',
          path: 'failedAt',
          render: cell => moment(cell).format('DD/MM/YYYY hh:mm:ss'),
        },
        {
          label: 'Approved At',
          path: 'approvedAt',
          render: cell => moment(cell).format('DD/MM/YYYY hh:mm:ss'),
        },
      ]}
      rows={props.masteries}
      selectable
      onSelect={row => props.onSelect(row.masteryTest)}
    />
  </Async>
);

StudentMasteryList.propTypes = {
  masteries: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    availableAt: PropTypes.string.isRequired,
    failedAt: PropTypes.string.isRequired,
    approvedAt: PropTypes.string.isRequired,
    masteryTest: PropTypes.shape({
      modulePercentageToActive: PropTypes.number.isRequired,
      module: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default StudentMasteryList;
