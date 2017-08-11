import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';
import IconButton from '../../../../../core/form/IconButton';
import ItemFormContainer from '../../../../item/components/ItemFormContainer';
import Table from '../../../../../core/form/Table';
import Async from '../../../../../core/layout/Async';

const AllUnitItemList = props => (
  <Async fetching={props.fetching}>
    <Table
      columns={[
        {
         label: 'id',
         path: 'id',
         isKey: true,
         hidden: true,
        },
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
          render: (cell, row) => {
            return `${row.item.time < 60 ? '00:' : ''}${moment.duration(row.item.time, "seconds").format("mm:ss", {forceLength: true})}`
          },
        },
        {
          label: 'Actions',
          path: 'action',
          width: '70',
          render: (cell, row) => {
            if (localStorage.role === 'ADMIN' || props.unit.createdBy === localStorage.id) {
              return (
                <IconButton
                  icon="fa-plus-circle"
                  onClick={() => props.onLink(row)}
                />
              );
            }
            return null;
          }
        },
      ]}
      rows={props.items}
      expandable
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
  </Async>
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
