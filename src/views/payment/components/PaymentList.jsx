import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import numeral from 'numeral';
import { Modal } from 'antd';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

const PaymentList = props => (
  <Table
    fetching={props.fetching}
    columns={[
      {
        label: 'Created At',
        path: 'createdAt',
        sort: true,
        defaultSortOrder: 'descend',
        width: '110px',
        render: value => moment(value).format('DD/MM/YYYY')
      },
      {
        label: 'Due At',
        path: 'dueAt',
        sort: true,
        width: '110px',
        render: value => moment(value).format('DD/MM/YYYY')
      },
      {
        label: 'Student',
        path: 'student.name',
      },
      {
        label: 'Student Email',
        path: 'student.email',
      },
      {
        label: 'Plan',
        path: 'type',
        width: '150px',
      },
      {
        label: 'Status',
        path: 'status',
        width: '150px',
      },
      {
        label: 'Price',
        path: 'price',
        width: '170px',
        render: (value, row) => `${numeral(value - (row.discount || 0)).format('$0,0.00')} ${row.discount ? `(-${numeral(row.discount).format('$0,0.00')})` : ''}`
      },
      {
        label: 'Actions',
        path: 'action',
        align: 'center',
        width: '70px',
        render: (cell, row) => (
          <div>
            <Button
              icon="eye"
              onClick={() => Modal.info({
                okText: 'Close',
                title: 'Payment details',
                content: (
                  <div>
                    <b>Student</b>: {row.student.name}
                    <br/>
                    <b>Plan</b>: {row.type}
                    <br/>
                    <b>Price</b>: {numeral(row.price).format('$0,0.00')}
                    <br/>
                    <b>Discount</b>: {numeral(row.discount || 0).format('$0,0.00')}
                    <br/>
                    <b>Created at</b>: {moment(row.createdAt).format('DD/MM/YYYY')}
                    <br/>
                    <b>Due at</b>: {moment(row.dueAt).format('DD/MM/YYYY')}
                    <br/>
                    <br/>
                    <br/>
                    Link: <a href={row.link} rel="noopener noreferrer" target="_blank">{row.link}</a>
                  </div>
                )
              })}
            />
          </div>
        ),
      },
    ]}
    rows={props.payments}
    onChange={props.onChange}
    pagination={props.pagination}
  />
);

PaymentList.propTypes = {
  payments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  fetching: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
};

export default PaymentList;
