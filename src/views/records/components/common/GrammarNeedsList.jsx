import React from 'react';
import PropTypes from 'prop-types';
import round from 'lodash/round';
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
        render: (value, row) => {
          if (row.children) {
            return (<span>{value} <b>{row.children.length} student{row.children.length > 1 ? 's' : ''} needing help.</b></span>);
          }
          return value;
        },
      },
      {
        label: 'Attempts',
        path: 'total',
        width: 200,
        sort: true,
      },
      {
        label: '% Error',
        path: 'errorPercentage',
        width: 100,
        render: value => value && `${round(value, 2)}%`,
      },
    ]}
    rows={props.grammars}
  />
);

GrammarNeedsList.propTypes = {
  grammars: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default GrammarNeedsList;
