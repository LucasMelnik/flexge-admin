import React from 'react';
import PropTypes from 'prop-types';
import replace from 'lodash/replace';
import moment from 'moment';
import 'moment-duration-format';
import { browserHistory } from 'react-router';
import Async from '../../../../core/layout/Async';
import Table from '../../../../core/form/Table';
import IconButton from '../../../../core/form/IconButton';

const UnitList = props => (
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
          label: 'Group',
          path: 'group',
          width: '5%',
        },
        {
          label: 'Order',
          path: 'order',
          width: '5%',
        },
        {
          label: 'Name',
          path: 'name',
          width: '25%',
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
          label: 'Difficulty',
          path: 'difficulty',
          width: '100',
        },
        {
          label: 'Abilities',
          path: 'type.abilities',
          width: '90',
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
          label: 'Status content',
          path: 'review.status',
          width: '150',
          render: (cell, row) => row.review && (
            <div
              style={{
                color: '#fff',
                padding: 10,
                display: 'inline-block',
                fontWeight: 'bold',
                borderRadius: 5,
                backgroundColor: {
                  PENDING: '#ef8c3b',
                  REVIEWED: '#1188FF',
                  DONE: '#009687',
                  'NOT SENT TO REVIEW': '#758C98',
                  'AWAITING FORMAT REVIEW': '#758C98',
                }[row.review.statusFormat !== 'APPROVED' && row.review.status !== 'NOT SENT TO REVIEW' ? 'AWAITING FORMAT REVIEW' : row.review.status],
              }}
            >
              {row.review.statusFormat !== 'APPROVED' && row.review.status !== 'NOT SENT TO REVIEW' ? 'AWAITING FORMAT REVIEW' : row.review.status}
            </div>
          ),
        },
        {
          label: 'Status format',
          path: 'review.statusFormat',
          width: '150',
          render: (cell, row) => row.review && (
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
          width: '90',
        },
        {
          label: 'Unit time',
          path: 'time',
          width: '90',
          render: (cell, row) => {
            return `${row.time < 60 ? '00:' : ''}${moment.duration(row.time, "seconds").format("mm:ss", {forceLength: true})}`
          },
        },
        {
          label: 'Actions',
          path: 'action',
          width: '120',
          render: (cell, row) => {
            return (
              <div>
                {(row.createdBy === localStorage.id || localStorage.role === 'ADMIN') && (
                  <IconButton
                    icon="fa-trash"
                    onClick={() => props.onDelete(row)}
                  />
                )}
                {' '}
                {(row.createdBy === localStorage.id || localStorage.role === 'ADMIN') && (
                  <IconButton
                    icon="fa-edit"
                    onClick={() => browserHistory.push(`/modules/${row.module}/units/${row.id}`)}
                  />
                )}
              </div>
            );
          },
        },
      ]}
      rows={props.units}
      selectable
      onSelect={row => {
        if (row.type.name.toLowerCase() === 'review') {
          browserHistory.push(`/modules/${row.module}/units/${row.id}/review-items`)
        } else {
          browserHistory.push(`/modules/${row.module}/units/${row.id}/items`)
        }
      }}
    />
  </Async>
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
