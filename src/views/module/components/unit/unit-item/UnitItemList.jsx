import React from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import { formatTimeFromSeconds } from '../../../../../core/util';
import Select from '../../../../../core/form/Select';
import Button from '../../../../../core/form/Button';
import Table from '../../../../../core/form/Table';
import ItemFormContainer from '../../../../item/components/ItemFormContainer';

const UnitItemList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Order',
        path: 'order',
        width: '75px',
        render: (cell, row) => {
          if ((props.unit.createdBy === localStorage.id || localStorage.role === 'ADMIN') && !props.disabled) {
            return (
              <Select
                label="Order"
                disabled={props.submitting}
                value={row.order}
                onChange={order => props.onOrderOrGroupChange(row, order, row.group)}
                options={range(1, 61).map(value => ({
                  label: value.toString(),
                  value,
                }))}
              />
            );
          }
          return row.order;
        },
      },
      {
        label: 'Group',
        path: 'group',
        width: '130px',
        render: (cell, row) => {
          if ((props.unit.createdBy === localStorage.id || localStorage.role === 'ADMIN') && !props.disabled) {
            return (
              <Select
                label="Group"
                disabled={props.submitting}
                value={row.group}
                onChange={group => props.onOrderOrGroupChange(row, row.order, group)}
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
            );
          }
          return ['', 'Default', 'First Review', 'Second Review'][row.group];
        },
      },
      {
        label: 'Text',
        path: 'item.text',
        render: (cell, row) => (
          <div>{row.item.text ? row.item.text : row.item.title}</div>
        ),
      },
      {
        label: 'Translation',
        path: 'item.translation',
      },
      {
        label: 'Grammar',
        path: 'item.grammar.name',
        width: '150px',
      },
      {
        label: 'Type',
        path: 'item.type.name',
        width: '150px',
        sort: true,
      },
      {
        label: 'Time',
        path: 'item.time',
        width: '50px',
        render: (cell, row) => formatTimeFromSeconds(row.item.time),
      },
      {
        label: 'Actions',
        path: 'action',
        width: props.disabled ? '0px' : '150px',
        render: (cell, row, index) => {
          if ((props.unit.createdBy === localStorage.id || localStorage.role === 'ADMIN') && !props.disabled) {
            return (
              <div>
                <Button
                  icon="delete"
                  onClick={() => props.onDelete(row)}
                />
                {' '}
                <Button
                  label="+1"
                  onClick={() => props.onAutoReorder(index, 'ADD_LINE')}
                />
                {' '}
                <Button
                  label="-1"
                  onClick={() => props.onAutoReorder(index, 'REMOVE_LINE')}
                />
              </div>
            );
          }
          return null;
        },
      },
    ]}
    rows={props.items}
    expandableComponent={row => (
      <ItemFormContainer
        itemId={row.item.id}
        itemsTypeUrl={`unit-types/${props.unit.type.id}/item-types`}
        endpointUrl={`units/${props.unit.id}/items`}
        order={row.order}
        disabled={props.unit.type.name.toLowerCase() === 'review' || props.disabled}
        showPostPhrase={props.unit.type.name.toLowerCase() === 'vocabulary'}
      />
    )}
  />
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
  unit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
    type: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  fetching: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  submitting: PropTypes.bool,
  onOrderOrGroupChange: PropTypes.func.isRequired,
  onAutoReorder: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

UnitItemList.defaultProps = {
  submitting: false,
}

export default UnitItemList;
