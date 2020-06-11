import React from 'react';
import PropTypes from 'prop-types';
import { formatTimeFromSeconds, Roles } from '../../../../../core/util';
import Button from '../../../../../core/form/Button';
import ItemFormContainer from '../../../../item/components/ItemFormContainer';
import Table from '../../../../../core/form/Table';

const AllUnitItemList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Text',
        path: 'item.text',
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
        width: '130px',
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
        width: '70px',
        render: (cell, row) => {
          if (localStorage.role === Roles.ADMIN || props.unit.createdBy === localStorage.id) {
            return (
              <Button
                icon="plus"
                onClick={() => props.onLink(row)}
              />
            );
          }
          return null;
        },
      },
    ]}
    rows={props.items}
    expandableComponent={(row) => (
      <ItemFormContainer
        itemId={row.item.id}
        itemsTypeUrl={`unit-types/${row.unit.type.id}/item-types`}
        endpointUrl={`units/${row.unit.id}/items`}
        order={1}
        disabled
        showPostPhrase={row.unit.type.name.toLowerCase() === 'vocabulary'}
      />
    )}
  />
);

AllUnitItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    translation: PropTypes.string,
    grammar: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  })).isRequired,
  unit: PropTypes.shape({
    createdBy: PropTypes.string.isRequired,
  }).isRequired,
  fetching: PropTypes.bool.isRequired,
  onLink: PropTypes.func.isRequired,
};

export default AllUnitItemList;
