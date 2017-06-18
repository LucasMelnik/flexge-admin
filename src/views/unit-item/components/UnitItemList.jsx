import React from 'react';

import PropTypes from 'prop-types';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';

const UnitItemList = props => (
  <Paper>
    <Async fetching={props.fetching}>
      <Table
        columns={[
          {
            label: 'Order',
            path: 'order',
          },
          {
            label: 'Text',
            path: 'item.text',
          },
          {
            label: 'Translation',
            path: 'item.translation',
          },
          {
            label: 'Grammar',
            path: 'item.grammar.name',
          },
        ]}
        rows={props.items}
        selectable
        onSelect={row => props.onSelect(row)}
        onDelete={row => props.onDelete(row)}
      />
    </Async>
  </Paper>
);

UnitItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    item: PropTypes.shape({
      text: PropTypes.string.isRequired,
      translation: PropTypes.string.isRequired,
      grammar: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired
    }),
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default UnitItemList;
