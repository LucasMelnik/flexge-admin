import React from 'react';
import PropTypes from 'prop-types';
import Paper from '../../../../../core/layout/Paper';
import Async from '../../../../../core/content/Async';
import Separator from '../../../../../core/layout/Separator';
import Divider from '../../../../../core/layout/Divider';
import IconButton from '../../../../../core/form/IconButton';
import AccordionTable from '../../../../../core/content/AccordionTable';
import AllUnitItemListFilterContainer from './AllUnitItemListFilterContainer';
import ItemFormContainer from '../../../../item/components/ItemFormContainer';

const AllUnitItemList = props => (
  <Paper>
    <AllUnitItemListFilterContainer />
    <Separator />
    <Divider />
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
          },
        ]}
        rows={props.items}
        renderFunction={(row) => (
          <ItemFormContainer
            itemId={row.item.id}
            itemsTypeUrl={`unit-types/${row.unit.type.id}/item-types`}
            endpointUrl={`units/${row.unit.id}/items`}
            order={1}
            disabled
            showPostPhrase={row.unit.type.name.toLowerCase() === 'vocabulary'}
          />
        )}
        actionComponent={row =>
          <IconButton
            icon="add_circle"
            onClick={() => props.onLink(row)}
          />
        }
      />
    </Async>
  </Paper>
);

AllUnitItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    translation: PropTypes.string,
    grammar: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onLink: PropTypes.func.isRequired,
};

export default AllUnitItemList;
