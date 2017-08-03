import React from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import moment from 'moment';
import 'moment-duration-format';
import Paper from '../../../../../core/layout/Paper';
import Async from '../../../../../core/content/Async';
import Select from '../../../../../core/form/Select';
import AccordionTable from '../../../../../core/content/AccordionTable';
import ItemFormContainer from '../../../../item/components/ItemFormContainer';
import IconButton from '../../../../../core/form/IconButton';

const UnitItemList = props => (
  <Paper>
    <Async fetching={props.fetching}>
      <AccordionTable
        columns={[
          {
            label: 'Order',
            path: 'order',
            width: '7%',
            render: (row) => {
              if ((props.unit.createdBy === localStorage.id || localStorage.role === 'ADMIN') && !props.disabled) {
                return (
                  <Select
                    fullWidth
                    label="Order"
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
            width: '7%',
            render: (row) => {
              if ((props.unit.createdBy === localStorage.id || localStorage.role === 'ADMIN') && !props.disabled) {
                return (
                  <Select
                    fullWidth
                    label="Group"
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
            width: '25%',
            render: row => (
              <div>{row.item.text ? row.item.text : row.item.title}</div>
            ),
            rowColumnStyle: {
              textOverflow: 'none',
              paddingTop: 5,
              paddingBottom: 5,
              paddingRight: 15,
              whiteSpace: 'normal',
              textAlign: 'justify',
              lineHeight: '18px',
            },
          },
          {
            label: 'Translation',
            path: 'item.translation',
            width: '25%',
            rowColumnStyle: {
              textOverflow: 'none',
              paddingTop: 5,
              paddingBottom: 5,
              paddingRight: 15,
              whiteSpace: 'normal',
              textAlign: 'justify',
              lineHeight: '18px',
            },
          },
          {
            label: 'Grammar',
            path: 'item.grammar.name',
            width: '10%',
          },
          {
            label: 'Type',
            path: 'item.type.name',
            width: '9%',
          },
          {
            label: 'Time',
            path: 'item.time',
            width: '5%',
            render: row => (`${row.item.time < 60 ? '00:' : ''}${moment.duration(row.item.time, 'seconds').format('mm:ss', { forceLength: true })}`),
          },
        ]}
        rows={props.items}
        renderFunction={row => (
          <ItemFormContainer
            itemId={row.item.id}
            itemsTypeUrl={`unit-types/${props.unit.type.id}/item-types`}
            endpointUrl={`units/${props.unit.id}/items`}
            order={row.order}
            disabled={props.unit.type.name.toLowerCase() === 'review' || props.disabled}
            showPostPhrase={props.unit.type.name.toLowerCase() === 'vocabulary'}
          />
        )}
        actionComponent={(row, index) => {
          if ((props.unit.createdBy === localStorage.id || localStorage.role === 'ADMIN') && !props.disabled) {
            return (
              <div>
                <IconButton
                  icon="delete"
                  onClick={() => props.onDelete(row)}
                />
                <IconButton
                  icon="exposure_plus_1"
                  onClick={() => props.onAutoReorder(index, 'ADD_LINE')}
                />
                <IconButton
                  icon="exposure_neg_1"
                  onClick={() => props.onAutoReorder(index, 'REMOVE_LINE')}
                />
              </div>
            );
          }
          return null;
        }}
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
  onOrderOrGroupChange: PropTypes.func.isRequired,
  onAutoReorder: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UnitItemList;
