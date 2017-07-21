import React from 'react';
import PropTypes from 'prop-types';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';
import Table from '../../../core/content/Table';
import ModuleItemListFilterContainer from './ModuleItemListFilterContainer';
import Separator from '../../../core/layout/Separator';
import Divider from '../../../core/layout/Divider';
import Button from '../../../core/form/Button';
import LinkItemButtonContainer from './unit/unit-item/LinkItemButtonContainer';

const ModuleItemList = props => (
  <Paper>
    <ModuleItemListFilterContainer itemTypesUrl={props.itemTypesUrl} />
    <Separator />
    <Divider />
    <Async fetching={props.fetching}>
      <Table
        columns={[
          {
            label: 'Text',
            path: 'text',
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
          },
          {
            label: 'Type',
            path: 'type.name',
          },
          {
            label: 'Time',
            path: 'time',
            width: 30,
          },
        ]}
        rows={props.items}
        selectable
        onSelect={props.onSelect}
        actionComponent={row =>
          <LinkItemButtonContainer
            itemId={row.id}
            unitId={props.unit.id}
            order={props.nextOrder}
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
  nextOrder: PropTypes.number.isRequired,
  fetching: PropTypes.bool.isRequired,
  itemTypesUrl: PropTypes.string.isRequired,
};

export default ModuleItemList;
