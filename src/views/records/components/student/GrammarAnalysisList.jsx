import React from 'react';
import PropTypes from 'prop-types';
import round from 'lodash/round';
import Table from '../../../../core/form/Table';
import Tag from '../../../../core/layout/Tag';

const GrammarAnalysisList = props => (
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
        width: 200,
        sort: true,
        align: 'center',
      },
      {
        label: '% Error',
        path: 'errorCount',
        align: 'center',
        sort: true,
        width: 100,
        render: (value,row) => {
          const percentage = round((value / row.total) * 100, 2);
          if (percentage >= 25) {
            return (
              <Tag color="red">
                {percentage}%
              </Tag>
            );
          }
          return `${percentage}%`;
        },
      },
    ]}
    rows={props.grammars}
  />
);

GrammarAnalysisList.propTypes = {
  grammars: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default GrammarAnalysisList;
