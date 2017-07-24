import React from 'react';
import PropTypes from 'prop-types';
import Paper from '../../../core/layout/Paper';
import Async from '../../../core/content/Async';
import AccordionTable from '../../../core/content/AccordionTable';
import ItemFormContainer from '../../item/components/ItemFormContainer';
import IconButton from '../../../core/form/IconButton';

const MasteryTestListItems = props => (
  <Paper
    flexible
  >
    <Async fetching={props.fetching}>
      <AccordionTable
        columns={[{
          label: 'Order',
          path: 'order',
          width: 300,
        },
        {
          label: 'Name',
          path: 'item.type.name',
          width: 930,
        },
        {
          label: 'Time',
          path: 'item.time',
          width: 930,
        },
        ]}
        rows={props.items}
        renderFunction={row =>
          props.items && (
            <ItemFormContainer
              itemId={row.item.id}
              itemsTypeUrl={'/item-types'}
              endpointUrl={`/mastery-tests/${props.masteryTestId}/items`}
              order={row.order}
              showPostPhrase={false}
            />
          )
        }
        actionComponent={row => (
          <IconButton
            icon="delete"
            onClick={() => props.onDelete(props.masteryTestId, row.item.id)}
          />
        )}
      />
    </Async>
  </Paper>
);

MasteryTestListItems.propTypes = {
  items: PropTypes.array.isRequired,
  masteryTestId: PropTypes.string,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};
MasteryTestListItems.defaultProps = {
  masteryTestId: null,
};

export default MasteryTestListItems;
