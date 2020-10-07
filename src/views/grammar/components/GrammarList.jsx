import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const GrammarList = props => (
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
        label: 'Actions',
        path: 'action',
        width: '80px',
        render: (cell, row) => (
          <Button
            icon="edit"
            onClick={() => browserHistory.push(`/grammars/${row.id}`)}
          />
        ),
      },
    ]}
    rows={props.grammars}
  />
);

GrammarList.propTypes = {
  grammars: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default GrammarList;
