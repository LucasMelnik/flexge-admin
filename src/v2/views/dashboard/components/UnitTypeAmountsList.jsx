import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import Async from '../../../core/layout/Async';

const UnitTypeAmountsList = props => (
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
);

UnitTypeAmountsList.propTypes = {
  amounts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    amountDone: PropTypes.number,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default UnitTypeAmountsList;
