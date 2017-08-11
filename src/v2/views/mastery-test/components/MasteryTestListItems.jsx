import React from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import moment from 'moment';
import 'moment-duration-format';
import IconButton from '../../../core/form/IconButton';
import Select from '../../../core/form/Select';
import Async from '../../../core/layout/Async';
import Table from '../../../core/form/Table';

const MasteryTestListItems = props => (
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
          render: (row) => (
            <Select
              label="Order"
              value={row.order}
              onChange={order => props.onOrderChange(row.item.id, order)}
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
          render: (row) => {
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
      expandableComponent={(row) => <p>Render itemForm</p>}
    />
  </Async>
);

MasteryTestListItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    masteryTest: PropTypes.string.isRequired,
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSaveSuccess: PropTypes.func.isRequired,
  onOrderChange: PropTypes.func.isRequired,
};

export default MasteryTestListItems;
