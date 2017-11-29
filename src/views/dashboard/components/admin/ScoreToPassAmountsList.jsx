import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core/form/Table';

const ScoreToPassAmountsList = props => (
  <Table
    fetching={props.fetching}
    columns={[
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
);

ScoreToPassAmountsList.propTypes = {
  amounts: PropTypes.arrayOf(PropTypes.shape({
    scoreToPass: PropTypes.number,
    amount: PropTypes.number,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default ScoreToPassAmountsList;
