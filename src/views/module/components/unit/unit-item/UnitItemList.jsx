import React from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import { browserHistory } from 'react-router';
import Paper from '../../../../../core/layout/Paper';
import Async from '../../../../../core/content/Async';
import Table from '../../../../../core/content/Table';
import Select from '../../../../../core/form/Select';

const UnitItemList = props => (
  <Paper>
    <Async fetching={props.fetching}>
      <Table
        columns={[
          {
            label: 'Text',
            path: 'item.text',
            rowColumnStyle: {
              textOverflow: 'none',
              paddingTop: 5,
              paddingBottom: 5,
              paddingRight: 5,
              whiteSpace: 'normal',
              textAlign: 'justify',
              lineHeight: '18px',
            },
          },
          {
            label: 'Translation',
            path: 'item.translation',
            rowColumnStyle: {
              textOverflow: 'none',
              paddingTop: 5,
              paddingBottom: 5,
              paddingRight: 5,
              whiteSpace: 'normal',
              textAlign: 'justify',
              lineHeight: '18px',
            },
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
            onChange={order => props.onOrderChange(row, order)}
            options={range(1, 31).map(value => ({
              label: value.toString(),
              value,
            }))}
            style={{
              width: 50,
            }}
          />
        )}
        onSelect={row => browserHistory.push(`/modules/${props.moduleId}/units/${props.unitId}${props.reviewId ? `/reviews/${props.reviewId}` : ''}/items/${row.item.id}`)}
        onDelete={row => props.onDelete(row)}
      />
    </Async>
  </Paper>
);

UnitItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    item: PropTypes.shape({
      text: PropTypes.string,
      translation: PropTypes.string,
      grammar: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    }),
  })).isRequired,
  unitId: PropTypes.string.isRequired,
  moduleId: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onOrderChange: PropTypes.func.isRequired,
  reviewId: PropTypes.string,
};

UnitItemList.defaultProps = {
  reviewId: null,
};

export default UnitItemList;
