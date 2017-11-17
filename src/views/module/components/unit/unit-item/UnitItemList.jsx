import React from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import moment from 'moment';
import 'moment-duration-format';
import Select from '../../../../../core/form/Select';
import IconButton from '../../../../../core/form/IconButton';
import Button from '../../../../../core/form/Button';
import Table from '../../../../../core/form/Table';
import Async from '../../../../../core/layout/Async';
import ItemFormContainer from '../../../../item/components/ItemFormContainer';
import './select.css';

const UnitItemList = props => (
  <Async fetching={props.fetching}>
    <Table
      columns={[
        {
          label: 'ID',
          path: 'id',
          isKey: true,
          hidden: true,
        },
        {
          label: 'Order',
          path: 'order',
          width: '90px',
          rowColumnStyle: {
            overflow: 'visible',
          },
          render: (cell, row) => {
            if ((props.unit.createdBy === localStorage.id || localStorage.role === 'ADMIN') && !props.disabled) {
              return (
                <Async fetching={props.submitting} size="md">
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
                </Async>
              );
            }
            return row.order;
          },
        },
        {
          label: 'Group',
          path: 'group',
          width: '150px',
          rowColumnStyle: {
            overflow: 'visible',
          },
          render: (cell, row) => {
            if ((props.unit.createdBy === localStorage.id || localStorage.role === 'ADMIN') && !props.disabled) {
              return (
                <Async fetching={props.submitting} size="md">
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
                </Async>
              );
            } else {
              return ['', 'Default', 'First Review', 'Second Review'][row.group];
            }
          }
        },
        {
          label: 'Text',
          path: 'item.text',
          width: '23%',
          rowColumnStyle: {
            textOverflow: 'none',
            paddingTop: 5,
            paddingBottom: 5,
            paddingRight: 5,
            whiteSpace: 'normal',
            textAlign: 'justify',
            lineHeight: '18px',
          },
          render: (cell, row) => (
            <div>{row.item.text ? row.item.text : row.item.title}</div>
          ),
        },
        {
          label: 'Translation',
          path: 'item.translation',
          width: '23%',
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
          width: '13%',
        },
        {
          label: 'Type',
          path: 'item.type.name',
          width: '10%',
        },
        {
          label: 'Time',
          path: 'item.time',
          width: '5%',
          render: (cell, row) => {
            return `${row.item.time < 60 ? '00:' : ''}${moment.duration(row.item.time, "seconds").format("mm:ss", {forceLength: true})}`
          },
        },
        {
          label: 'Actions',
          path: 'action',
          width: props.disabled ? '0' : '175',
          render: (cell, row, extraData, index) => {
            if ((props.unit.createdBy === localStorage.id || localStorage.role === 'ADMIN') && !props.disabled) {
              return (
                <div>
                  <IconButton
                    icon="fa-trash"
                    onClick={() => props.onDelete(row)}
                  />
                  {' '}
                  <Button
                    label="+1"
                    type="primary"
                    onClick={() => props.onAutoReorder(index, 'ADD_LINE')}
                  />
                  {' '}
                  <Button
                    label="-1"
                    type="primary"
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
      expandable
      expandableComponent={(row, expanded) => (
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
  </Async>
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
