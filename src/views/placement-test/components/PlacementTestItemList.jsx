import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';
import AccordionTable from '../../../core/content/AccordionTable';
import ItemFormContainer from '../../item/components/ItemFormContainer';
import IconButton from '../../../core/form/IconButton';

const PlacementTestItemList = props => (
  <Paper>
    <Async fetching={props.fetching}>
      <AccordionTable
        columns={[
          {
            label: 'Text',
            path: 'item.text',
            width: '30%',
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
            width: '30%',
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
            width: '10%',
            render: (row) => {
              return `${row.item.time < 60 ? '00:' : ''}${moment.duration(row.item.time, "seconds").format("mm:ss", {forceLength: true})}`
            },
          },
        ]}
        rows={props.items}
        renderFunction={(row) => (
          <ItemFormContainer
            itemId={row.item.id}
            itemsTypeUrl="/item-types?allowedForPlacementTest=true"
            endpointUrl={`grammar-placement-test-levels/${row.grammarPlacementTestLevel.id}/items`}
            isTestItem
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
    grammarPlacementTestLevel: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
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
