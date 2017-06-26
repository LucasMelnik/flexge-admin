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
            label: 'Amount Done',
            path: 'amountDone',
          },
        ]}
        rows={props.amounts}
      />
    </Async>
  </Paper>
);

UnitTypeAmountsList.propTypes = {
  amounts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    amountDone: PropTypes.number,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default  UnitTypeAmountsList;