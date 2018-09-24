import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import round from 'lodash/round';
import Table from '../../../../core/form/Table';
import Tag from '../../../../core/layout/Tag';
import Button from '../../../../core/form/Button';

const StudiedGrammarList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Grammar',
        path: 'name',
        defaultSortOrder: 'ascend',
        sort: true,
        width: 100,
        render: (value, row) => ({
          children: row.children ? row.name : row.unit.module.course.name,
          props: {
            colSpan: row.children ? 3 : 1,
          },
        }),
      },
      {
        label: '',
        path: 'unit.module.name',
        render: (value, row) => ({
          children: row.children ? '' : row.unit.module.name,
          props: {
            colSpan: row.children ? 0 : 1,
          },
        }),
      },
      {
        label: '',
        path: 'unit.name',
        render: (value, row) => ({
          children: row.children ? '' : row.unit.name,
          props: {
            colSpan: row.children ? 0 : 1,
          },
        }),
      },
      {
        label: 'Total',
        path: 'total',
        width: 150,
        sort: true,
        align: 'center',
        render: (value, row) => ({
          children: row.children ? row.total : row.item.text,
          props: {
            colSpan: row.children ? 1 : 2,
          },
        }),
      },
      {
        label: 'Total Errors',
        path: 'errorCount',
        width: 150,
        sort: true,
        align: 'center',
        render: (value, row) => ({
          children: row.children ? row.errorCount : '',
          props: {
            colSpan: row.children ? 1 : 0,
          },
        }),
      },
      {
        label: '% Error',
        path: 'errorCountPercentage',
        align: 'center',
        sort: true,
        width: 100,
        render: (value, row) => {
          if (row.children) {
            const percentage = round((row.errorCount / row.total) * 100, 2);
            if (percentage >= 25) {
              return (
                <Tag color="red">
                  {percentage}%
                </Tag>
              );
            }
            return `${percentage}%`;
          }
          return (
            <Button
              icon="eye"
              onClick={() => browserHistory.push(`/contents/${row.unit.id}/details`)}
            />
          );
        },
      },
    ]}
    rows={props.grammars}
  />
);

StudiedGrammarList.propTypes = {
  grammars: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default StudiedGrammarList;
