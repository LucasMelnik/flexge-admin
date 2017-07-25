import React from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';
import Select from '../../../core/form/Select';
import AccordionTable from '../../../core/content/AccordionTable';
import ItemFormContainer from '../../item/components/ItemFormContainer';
import IconButton from '../../../core/form/IconButton';

const PlacementTestItemList = props => (
  <Paper>
    <Async fetching={props.fetching}>
      <AccordionTable
        columns={[
          {
            label: 'Order',
            path: 'order',
            width: '5%',
            render: (row) => (
              <Select
                fullWidth
                label="Order"
                value={row.order}
                onChange={order => props.onOrderChange(row, order, row.group)}
                options={range(1, 11).map(value => ({
                  label: value.toString(),
                  value,
                }))}
              />
            )
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
            itemsTypeUrl="/item-types?allowedForPlacementTest=true"
            endpointUrl={`grammar-placement-test-levels/${row.grammarPlacementTestLevel}/items`}
            order={row.order}
          />
        )}
        actionComponent={row => (
          <IconButton
            icon="delete"
            onClick={() => props.onDelete(row)}
          />
        )}
      />
    </Async>
  </Paper>
);

PlacementTestItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    grammarPlacementTestLevel: PropTypes.string.isRequired,
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
};

export default PlacementTestItemList;
