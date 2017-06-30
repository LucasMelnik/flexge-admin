import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Paper from '../../../../core/layout/Paper';
import Divider from '../../../../core/layout/Divider';
import Separator from '../../../../core/layout/Separator';
import Async from '../../../../core/content/Async';
import Table from '../../../../core/content/Table';
import UnitListFilterContainer from './UnitListFilterContainer';

const UnitList = props => (
  <Paper>
    <Async fetching={props.fetching}>
      <div>
        <UnitListFilterContainer />
        <Separator />
        <Divider />
        <Table
          columns={[
            {
              label: 'Name',
              path: 'name',
            },
            {
              label: 'Group',
              path: 'group',
              width: 40,
            },
            {
              label: 'Order',
              path: 'order',
              width: 40,
            },
            {
              label: 'Difficulty',
              path: 'difficulty',
            },
            {
              label: 'Abilities',
              path: 'type.abilities',
            },
            {
              label: 'Unit Type',
              path: 'type.name',
            },
            {
              label: 'Items count',
              path: 'itemsCount',
              width: 80,
            },
          ]}
          rows={props.units}
          selectable
          onSelect={row => browserHistory.push(`/modules/${row.module}/units/${row.id}/items`)}
          onEdit={row => browserHistory.push(`/modules/${row.module}/units/${row.id}`)}
          onDelete={row => props.onDelete(row)}
        />
        <Separator />
      </div>
    </Async>
  </Paper>
);

UnitList.propTypes = {
  units: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UnitList;
