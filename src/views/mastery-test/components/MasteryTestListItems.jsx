import React from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import moment from 'moment';
import 'moment-duration-format';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';
import AccordionTable from '../../../core/content/AccordionTable';
import ItemFormContainer from '../../item/components/ItemFormContainer';
import IconButton from '../../../core/form/IconButton';
import Select from '../../../core/form/Select';

const MasteryTestListItems = props => (
  <Paper
    flexible
  >
    <Async fetching={props.fetching}>
      <AccordionTable
        columns={[
          {
            label: 'Order',
            path: 'order',
            width: '7%',
            rowColumnStyle: {
              paddingRight: 10,
            },
            render: (row) => (
              <Select
                fullWidth
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
        ]}
        rows={props.items}
        renderFunction={row =>
          props.items && (
            <ItemFormContainer
              itemId={row.item.id}
              itemsTypeUrl="/item-types?allowedForMasteryTest=true"
              endpointUrl={`/mastery-tests/${row.masteryTest}/items`}
              order={row.order}
              showPostPhrase={false}
              onSaveSuccess={props.onSaveSuccess}
              isTestItem
            />
          )
        }
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
