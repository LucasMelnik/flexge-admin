import React from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import moment from 'moment';
import 'moment-duration-format';
import IconButton from '../../../core/form/IconButton';
import Select from '../../../core/form/Select';
import Async from '../../../core/layout/Async';
import Table from '../../../core/form/Table';
import ItemFormContainer from '../../item/components/ItemFormContainer';

const PracticeTestListItems = props => (
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
          width: '7%',
          rowColumnStyle: {
            paddingRight: 10,
          },
          render: (cell, row) => (
            <Select
              label="Order"
              value={row.order}
              onChange={order => props.onOrderChange(row.id, order)}
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
          label: 'Translate',
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
          label: 'Type',
          path: 'item.type.name',
          width: '15%',
        },
        {
          label: 'Time',
          path: 'item.time',
          width: '15%',
          render: (cell, row) => {
            return `${row.item.time < 60 ? '00:' : ''}${moment.duration(row.item.time, "seconds").format("mm:ss", {forceLength: true})}`
          },
        },
        {
          label: 'Actions',
          path: 'action',
          width: '60',
          render: (cell, row) => {
            return (
              <IconButton
                icon="fa-trash"
                onClick={() => props.onDelete(row)}
              />
            );
          },
        },
      ]}
      rows={props.items}
      expandable
      expandableComponent={(row) => (
        <ItemFormContainer
          itemId={row.id}
          itemsTypeUrl="/item-types"
          endpointUrl={'practice-test-items'}
          order={row.order}
          showPostPhrase={false}
          onSaveSuccess={props.onSaveSuccess}
          isTestItem
        />
      )}
    />
  </Async>
);

PracticeTestListItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    practiceTest: PropTypes.string.isRequired,
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSaveSuccess: PropTypes.func.isRequired,
  onOrderChange: PropTypes.func.isRequired,
};

export default PracticeTestListItems;
