import React from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
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
            width: '5%',
            render: (row) => {
              if ((props.unit.createdBy === localStorage.id || localStorage.role === 'ADMIN') && !props.disabled){
                return (
                  <Select
                    fullWidth
                    label="Order"
                    value={row.order}
                    onChange={order => props.onOrderOrGroupChange(row, order, row.group)}
                    options={range(1, 31).map(value => ({
                      label: value.toString(),
                      value,
                    }))}
                  />
                );
              } else {
                return row.order;
              }
            }
          },
          {
            label: 'Group',
            path: 'group',
            width: '10%',
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
              } else {
                return row.group;
              }
            }
          },
          {
            label: 'Text',
            path: 'item.text',
            width: '25%',
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
            width: '25%',
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
            width: '15%',
          },
          {
            label: 'Type',
            path: 'item.type.name',
            width: '15%',
          },
          {
            label: 'Time',
            path: 'item.time',
            width: '5%',
          },
        ]}
        rows={props.items}
        renderFunction={(row) => (
          <ItemFormContainer
            itemId={row.item.id}
            itemsTypeUrl={`unit-types/${props.unit.type.id}/item-types`}
            endpointUrl={`units/${props.unit.id}/items`}
            order={row.order}
            disabled={props.unit.type.name.toLowerCase() === 'review' || props.disabled}
            showPostPhrase={props.unit.type.name.toLowerCase() === 'vocabulary'}
          />
        )}
        actionComponent={row => {
          if ((props.unit.createdBy === localStorage.id || localStorage.role === 'ADMIN') && !props.disabled) {
            return (
              <IconButton
                icon="delete"
                onClick={() => props.onDelete(row)}
              />
            )
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
  onDelete: PropTypes.func.isRequired,
};

export default UnitItemList;
