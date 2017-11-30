import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core/form/Table';

const UnitTypeAmountsList = props => (
  <Table
    fetching={props.fetching}
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
);

UnitTypeAmountsList.propTypes = {
  amounts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    amountDone: PropTypes.number,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default UnitTypeAmountsList;
