import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const CertificationTestRegisterList = props => (
  <div>
    <Table
      fetching={props.fetching}
      columns={[
        {
          label: 'Course',
          path: 'course.name',
          width: '80px',
          sort: true,
        },
        {
          label: 'Order',
          path: 'order',
          width: '85px',
          sort: true,
        },
        {
          label: 'Ability',
          path: 'ability',
          width: '95px',
          sort: true,
        },
        {
          label: 'Grammar',
          path: 'grammar.name',
        },
        {
          label: 'Status',
          path: 'reviews',
          width: '150px',
          render: (cell, row) => {
            if (!row.reviews || !row.reviews.length) {
              return 'No Reviews';
            }
            if (row.reviews.find(review => review.status === 'PENDING')) {
              return 'Pending';
            }
            if (row.reviews.find(review => review.status === 'NOT_APPROVED')) {
              return 'Not Approved';
            }
            return 'Approved';
          },
        },
        {
          label: 'Items Count',
          path: 'items.length',
          width: '115px',
        },
        {
          label: 'Items to Show',
          path: 'itemsToShow',
          width: '115px',
          render: cell => cell || 0,
        },
        {
          label: 'Extra Items',
          width: '105px',
          render: (cell, row) => (row.items.length - row.itemsToShow) || 0,
        },
        {
          label: 'Actions',
          path: 'action',
          width: '105px',
          render: (cell, row) => {
            return (
              <div>
                <Button
                  icon="delete"
                  onClick={() => props.onDelete(row)}
                />
                {' '}
                <Button
                  icon="edit"
                  onClick={() => browserHistory.push(`/certification-test-register/${row.id}`)}
                />
              </div>
            );
          },
        },
      ]}
      rows={props.registers}
    />
    <small>{props.registers.reduce((acc, test) => acc + (test.items.length || 0), 0)} item{props.registers.reduce((acc, test) => acc + (test.items.length || 0), 0) > 1 && 's'} found.</small>
    <br />
    <small>{props.registers.reduce((acc, test) => acc + (test.itemsToShow || 0), 0)} item{props.registers.reduce((acc, test) => acc + (test.itemsToShow || 0), 0) > 1 && 's'} to show.</small>
  </div>
);

CertificationTestRegisterList.propTypes = {
  registers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    itemsToShow: PropTypes.number.isRequired,
    course: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.number.isRequired,
    }).isRequired,
    grammar: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CertificationTestRegisterList;
