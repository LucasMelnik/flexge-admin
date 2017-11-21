import React from 'react';
import PropTypes from 'prop-types';
import replace from 'lodash/replace';
import { browserHistory } from 'react-router';
import { formatTimeFromSeconds } from '../../../../core/util';
import Table from '../../../../core/form/Table';
import Button from '../../../../core/form/Button';
import StatusItem from '../../../../core/layout/StatusItem';

const UnitList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Group',
        path: 'group',
        width: '75px',
        sort: true,
      },
      {
        label: 'Order',
        path: 'order',
        width: '75px',
        sort: true,
      },
      {
        label: 'Name',
        path: 'name',
        sort: true,
      },
      {
        label: 'Difficulty',
        path: 'difficulty',
        width: '75px',
      },
      {
        label: 'Abilities',
        path: 'type.abilities',
        width: '70px',
        render: (cell, row) => (
          <div>
            {row.type.abilities.map((ability, index) => {
              if (row.type.abilities.length !== index + 1) {
                return `${ability.charAt(0)}, `;
              }
              return `${ability.charAt(0)}`;
            })}
          </div>
        ),
      },
      {
        label: 'Unit Type',
        path: 'type.name',
        width: '135px',
      },
      {
        label: 'Status content',
        path: 'review.status',
        render: (cell, row) => row.review && (
          <StatusItem
            color={{
              PENDING: '#ef8c3b',
              REVIEWED: '#1188FF',
              DONE: '#009687',
              'NOT SENT TO REVIEW': '#758C98',
              'AWAITING FORMAT REVIEW': '#758C98',
            }[row.review.statusFormat !== 'APPROVED' && row.review.status !== 'NOT SENT TO REVIEW' ? 'AWAITING FORMAT REVIEW' : row.review.status]}
            text={row.review.statusFormat !== 'APPROVED' && row.review.status !== 'NOT SENT TO REVIEW' ? 'AWAITING FORMAT REVIEW' : row.review.status}
          />
        ),
      },
      {
        label: 'Status format',
        path: 'review.statusFormat',
        render: (cell, row) => row.review && (
          <StatusItem
            color={{
              PENDING: '#ef8c3b',
              PENDING_REVIEW: '#ef8c3b',
              APPROVED: '#009687',
              NOT_APPROVED: '#FF5233',
              DONE: '#009687',
            }[row.review.statusFormat]}
            text={replace(row.review.statusFormat, '_', ' ')}
          />
        ),
      },
      {
        label: 'Status image',
        path: 'review.statusImage',
        render: (cell, row) => {
          if (row.review && row.type.name !== 'Review' && row.type.itemsType.find(itemType => ['PRESENTATION', 'SINGLE_CHOICE_IMAGE'].find(type => type === itemType.key))) {
            return (
              <StatusItem
                color={{
                  NOT_SEND_TO_REVIEW: '#758C98',
                  PENDING_REVIEW: '#ef8c3b',
                  APPROVED: '#009687',
                  NOT_APPROVED: '#FF5233',
                }[row.review.statusImage || 'NOT_SEND_TO_REVIEW']}
                text={replace(row.review.statusImage || 'NOT_SEND_TO_REVIEW', '_', ' ')}
              />
            );
          }
          return row.review ? 'N/A' : '';
        },
      },
      {
        label: 'Items count',
        path: 'itemsCount',
        width: '95px',
      },
      {
        label: 'Unit time',
        path: 'time',
        width: '80px',
        render: (cell, row) => formatTimeFromSeconds(row.time),
      },
      {
        label: 'Actions',
        path: 'action',
        width: props.allowReorder ? '180px' : '85px',
        render: (cell, row, extraData, index) => (
          <div>
            {(row.createdBy === localStorage.id || localStorage.role === 'ADMIN') && (
              <Button
                icon="delete"
                onClick={() => props.onDelete(row)}
              />
            )}
            {' '}
            {(row.createdBy === localStorage.id || localStorage.role === 'ADMIN') && (
              <Button
                icon="edit"
                onClick={() => browserHistory.push(`/modules/${row.module}/units/${row.id}`)}
              />
            )}
            {' '}
            {props.allowReorder && (
              <Button
                label="+1"
                onClick={() => props.onAutoReorder(index, 'ADD_LINE')}
              />
            )}
            {' '}
            {props.allowReorder && (
              <Button
                label="-1"
                onClick={() => props.onAutoReorder(index, 'REMOVE_LINE')}
              />
            )}
          </div>
        ),
      },
    ]}
    rows={props.units}
    selectable
    onSelect={(row) => {
      if (row.type.name.toLowerCase() === 'review') {
        browserHistory.push(`/modules/${row.module}/units/${row.id}/review-items`);
      } else {
        browserHistory.push(`/modules/${row.module}/units/${row.id}/items`);
      }
    }}
  />
);

UnitList.propTypes = {
  units: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  allowReorder: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAutoReorder: PropTypes.func.isRequired,
};

export default UnitList;
