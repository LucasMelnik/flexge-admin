import React from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import { formatTimeFromSeconds, Roles } from '../../../../../core/util';
import Select from '../../../../../core/form/Select';
import Button from '../../../../../core/form/Button';
import Table from '../../../../../core/form/Table';
import ItemFormContainer from '../../../../item/components/ItemFormContainer';
import { browserHistory } from 'react-router';

const UnitItemList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Order',
        path: 'order',
        width: '75px',
        sort: true,
        render: (cell, row) => {
          if ((props.unit.createdBy === localStorage.id || [Roles.ADMIN, Roles.SUPPORT].some(r => r === localStorage.role)) && !props.disabled) {
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
          if ((props.unit.createdBy === localStorage.id || [Roles.ADMIN, Roles.SUPPORT].some(r => r === localStorage.role)) && !props.disabled) {
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
        width: '20%',
        render: (cell, row) => (
          <div>{row.item.text ? row.item.text : row.item.title}</div>
        ),
      },
      {
        label: 'Translation',
        path: 'item.translation',
        width: '20%',
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
        render: (cell, row) => <span style={{color: row.item.invalidItemType ? 'red' : 'inherited' }}>{cell}</span>,
      },
      {
        label: 'Time',
        path: 'item.time',
        width: '110px',
        render: (cell, row) => (
          <div>
            <div>{formatTimeFromSeconds(row.item.time)}</div>
            {(row.item.type.key === 'VIDEO' || row.item.type.key === 'VIDEO_SHORT') && (
              <div>{`${row.item.videoStartTime.slice(0, 2)}:${row.item.videoStartTime.slice(2, 4)}:${row.item.videoStartTime.slice(4, 6)}`} - {`${row.item.videoEndTime.slice(0, 2)}:${row.item.videoEndTime.slice(2, 4)}:${row.item.videoEndTime.slice(4, 6)}`}</div>
            )}
          </div>
        ),
      },
      {
        label: 'Actions',
        path: 'action',
        width: props.disabled ? '0px' : '150px',
        render: (cell, row, index) => {
          if ((props.unit.createdBy === localStorage.id || [Roles.ADMIN, Roles.SUPPORT].some(r => r === localStorage.role)) && !props.disabled) {
            return (
              <div>
                <Button
                  icon="delete"
                  onClick={() => props.onDelete(row)}
                />
                {' '}
                <Button
                  icon="copy"
                  onClick={() => browserHistory.push({
                    pathname: `/modules/${props.unit.module.id}/units/${props.unit.id}/items/new`,
                    state: { item: row.item },
                  })}
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
    module: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
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
};

export default UnitItemList;
