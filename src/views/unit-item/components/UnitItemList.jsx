import React from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';
import Select from "../../../core/form/Select";

const UnitItemList = props => (
  <Paper>
    <Async fetching={props.fetching}>
      <Table
        columns={[
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
          {
            label: 'Type',
            path: 'item.type.name',
          },
        ]}
        rows={props.items}
        selectable
        actionComponentWidth={130}
        actionComponent={row => (
          <Select
            fullWidth
            label="Order"
            value={row.order}
            onChange={(order) => props.onOrderChange(row, order)}
            options={range(1, 16).map(value => ({
              label: value.toString(),
              value,
            }))}
            style={{
              width: 50,
            }}
          />
        )}
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
      translation: PropTypes.string,
      grammar: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired
    }),
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onOrderChange: PropTypes.func.isRequired,
};

export default UnitItemList;
