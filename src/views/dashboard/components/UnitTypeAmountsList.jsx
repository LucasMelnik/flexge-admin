import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../core/content/Table';
import Paper from '../../../core/layout/Paper';
import Async from "../../../core/content/Async";

const UnitTypeAmountsList = props => (
  <Paper>
    <Async fetching={props.fetching}>
      <Table
        columns={[
          {
            label: 'Unit Type',
            path: 'name',
          },
          {
            label: 'Planned Amount',
            path: 'plannedAmount',
          },
          {
            label: 'Amount Done',
            path: 'amountDone',
          },
          {
            label: 'Amount to do',
            path: 'amountToDo',
          },
        ]}
        rows={props.amounts}
      />
    </Async>
  </Paper>
);

UnitTypeAmountsList.propTypes = {
  amounts: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    plannedAmount: PropTypes.number,
    amountDone: PropTypes.number,
    amountToDo: PropTypes.number,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default  UnitTypeAmountsList;