import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core/form/Table';
import { formatTimeFromSeconds } from '../../../../core/util';

const UnitAverageExecutionTimeList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Unit',
        path: 'name',
        sort: true,
      },
      {
        label: 'Unit Type',
        path: 'type.name',
        sort: true,
      },
      {
        label: 'Executions',
        path: 'executionCount',
        width: '120px',
        sort: true,
      },
      {
        label: 'Average time (mm:ss)',
        path: 'averageTime',
        width: '190px',
        sort: true,
        render: value => formatTimeFromSeconds(value),
      },
      {
        label: 'Higher time (mm:ss)',
        path: 'higherTime',
        width: '190px',
        sort: true,
        render: value => formatTimeFromSeconds(value),
      },
      {
        label: 'Lower time (mm:ss)',
        path: 'lowerTime',
        width: '190px',
        sort: true,
        render: value => formatTimeFromSeconds(value),
      },
    ]}
    rows={props.units}
  />
);

UnitAverageExecutionTimeList.propTypes = {
  units: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    unit: PropTypes.PropTypes.shape({}).isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default UnitAverageExecutionTimeList;
