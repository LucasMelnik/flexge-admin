import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import Async from '../../../core/layout/Async';


const ScoreToPassAmountsList = props => (
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
          label: 'ScoreToPass',
          path: 'scoreToPass',
        },
        {
          label: 'Amount',
          path: 'amount',
        },
      ]}
      rows={props.amounts}
    />
  </Async>
);

ScoreToPassAmountsList.propTypes = {
  amounts: PropTypes.arrayOf(PropTypes.shape({
    scoreToPass: PropTypes.number,
    amount: PropTypes.number,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default ScoreToPassAmountsList;
