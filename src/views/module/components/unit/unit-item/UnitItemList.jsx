import React from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
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
          {
            label: 'Time',
            path: 'time',
            width: 30,
          },
        ]}
        rows={props.items}
        selectable
        actionComponentWidth={280}
        actionComponent={row => (
          <div
            style={{
              display: 'inline-block',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                width: 50,
                marginRight: 10,
              }}
            >
              <Select
                fullWidth
                label="Order"
                value={row.order}
                onChange={order => props.onOrderChange(row, order, row.group, row.time)}
                options={range(1, 31).map(value => ({
                  label: value.toString(),
                  value,
                }))}
              />
            </div>
            <div
              style={{
                display: 'inline-block',
                width: 170,
              }}
            >
              <Select
                fullWidth
                label="Group"
                value={row.group}
                onChange={group => props.onOrderChange(row, row.order, group, row.time)}
                options={[
                  {
                    label: 'Default',
                    value: 1,
                  },
                  {
                    label: 'First Review',
                    value: 2,
                  },
                  {
                    label: 'Second Review',
                    value: 3,
                  },
                ]}
              />
            </div>
          </div>
        )}
        onSelect={props.onSelect}
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
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onOrderChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default UnitItemList;
