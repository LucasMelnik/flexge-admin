import React from 'react';
import PropTypes from 'prop-types';
import replace from 'lodash/replace';
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
        <div
          style={{
            textAlign: 'right',
            fontSize: 13,
          }}
        >
          {props.units && props.units.length} records found.
        </div>
        <UnitListFilterContainer />
        <Separator />
        <Divider />
        <Table
          columns={[
            {
              label: 'Group',
              path: 'group',
              width: 80,
            },
            {
              label: 'Order',
              path: 'order',
              width: 80,
            },
            {
              label: 'Name',
              path: 'name',
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
              label: 'Status content',
              path: 'review.status',
              render: row => row.review && (
                <div
                  style={{
                    color: '#fff',
                    padding: 10,
                    display: 'inline-block',
                    fontWeight: 'bold',
                    borderRadius: 5,
                    backgroundColor: {
                      PENDING: '#ef8c3b',
                      REVIEWED: '#009687',
                      DONE: '#009687',
                      'NOT SENT TO REVIEW': '#758C98',
                    }[row.review.status],
                  }}
                >
                  {row.review.status}
                </div>
              ),
            },
            {
              label: 'Status format',
              path: 'review.statusFormat',
              render: row => row.review && (
                <div
                  style={{
                    color: '#fff',
                    padding: 10,
                    display: 'inline-block',
                    fontWeight: 'bold',
                    borderRadius: 5,
                    backgroundColor: {
                      PENDING: '#ef8c3b',
                      PENDING_REVIEW: '#ef8c3b',
                      APPROVED: '#009687',
                      NOT_APPROVED: '#FF5233',
                      DONE: '#009687',
                    }[row.review.statusFormat],
                  }}
                >
                  {replace(row.review.statusFormat, '_', ' ')}
                </div>
              ),
            },
            {
              label: 'Items count',
              path: 'itemsCount',
              width: 150,
            },
          ]}
          rows={props.units}
          selectable
          allowActionValidator={row => row.createdBy === localStorage.id}
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
