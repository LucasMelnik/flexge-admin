import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import round from 'lodash/round';
import Table from '../../../../core/form/Table';
import Tag from '../../../../core/layout/Tag';

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
            colSpan: row.children ? 4 : 1,
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
          children: row.children ? '' : (
            <Link
              target="_blank"
              to={`/contents/${row.unit.id}/details`}
            >
              {row.unit.name}
            </Link>
          ),
          props: {
            colSpan: row.children ? 0 : 1,
          },
        }),
      },
      {
        label: '',
        path: 'item.text',
        width: '30%',
        render: (value, row) => ({
          children: row.children ? '' : row.item.text,
          props: {
            colSpan: row.children ? 0 : 5,
          },
        }),
      },
      {
        label: 'Students',
        path: 'students',
        width: 150,
        sort: true,
        align: 'center',
        render: (value, row) => ({
          children: row.children ? row.students : '',
          props: {
            colSpan: row.children ? 1 : 0,
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
            colSpan: row.children ? 1 : 0,
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
        path: 'errorPercentage',
        align: 'center',
        sort: true,
        width: 100,
        render: (value, row) => {
          let content = null;
          if (row.children) {
            value = round(value, 2 );
            if (value >= 25) {
              content = (
                <Tag color="red">
                  {value}%
                </Tag>
              );
            }
            content = `${value}%`;
          }
          return {
            children: content,
            props: {
              colSpan: row.children ? 1 : 0,
            },
          };
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
