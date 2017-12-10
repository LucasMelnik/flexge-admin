import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../../core/form/Table';

const GrammarNeedsList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Grammar',
        path: 'name',
        defaultSortOrder: 'ascend',
        sort: true,
      },
      {
        label: 'Total',
        path: 'total',
        sort: true,
      },
      {
        label: 'Correct',
        path: 'correctCount',
      },
      {
        label: '% Correct',
        path: 'correctPercentage',
        render: value => value && `${value}%`,
      },
      {
        label: '% Error',
        path: 'errorPercentage',
        render: value => value && `${value}%`,
      },
    ]}
    rows={props.grammars}
  />
);

GrammarNeedsList.propTypes = {
  grammars: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    correctCount: PropTypes.number.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default GrammarNeedsList;
