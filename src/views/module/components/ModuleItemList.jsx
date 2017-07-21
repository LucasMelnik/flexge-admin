import React from 'react';
import PropTypes from 'prop-types';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';
import ModuleItemListFilterContainer from './ModuleItemListFilterContainer';
import Separator from '../../../core/layout/Separator';
import Divider from '../../../core/layout/Divider';
import AccordionTable from '../../../core/content/AccordionTable';
import IconButton from '../../../core/form/IconButton';
import ItemFormContainer from '../../item/components/ItemFormContainer';

const ModuleItemList = props => (
  <Paper>
    <ModuleItemListFilterContainer />
    <Separator />
    <Divider />
    <Async fetching={props.fetching}>
      <AccordionTable
        columns={[
          {
            label: 'Text',
            path: 'text',
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
            path: 'translation',
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
            path: 'grammar.name',
            width: '15%',
          },
          {
            label: 'Type',
            path: 'type.name',
            width: '15%',
          },
          {
            label: 'Time',
            path: 'time',
            width: '10%',
          },
        ]}
        rows={props.items}
        renderFunction={(row) => (
          <ItemFormContainer
            itemId={row.id}
            itemsTypeUrl={`unit-types/${props.unit.type.id}/item-types`}
            endpointUrl={`units/${props.unit.id}/items`}
            order={1}
            disabled
            showPostPhrase={props.unit.type.name.toLowerCase() === 'vocabulary'}
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

ModuleItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    translation: PropTypes.string,
    grammar: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  })).isRequired,
  unit: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  fetching: PropTypes.bool.isRequired,
  onLink: PropTypes.func.isRequired,
};

export default ModuleItemList;
