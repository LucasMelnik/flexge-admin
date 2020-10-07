import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const FunctionOfLanguageList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Name',
        path: 'name',
        sort: true,
        defaultSortOrder: 'ascend',
      },
      {
        label: 'Grammars',
        path: 'grammars',
        render: cell => cell.reduce((acc, grammar, index) => acc.concat(index ? ', ' : ' ').concat(grammar.name), '')
      },
      {
        label: 'Actions',
        path: 'action',
        width: '120px',
        render: (cell, row) => (
          <div>
            <Button
              icon="delete"
              onClick={() => props.onDelete(row)}
            />
            {' '}
            <Button
              icon="edit"
              onClick={() => browserHistory.push(`/functions-of-language/${row.id}`)}
            />
          </div>
        ),
      },
    ]}
    rows={props.functions}
  />
);

FunctionOfLanguageList.propTypes = {
  functions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default FunctionOfLanguageList;
