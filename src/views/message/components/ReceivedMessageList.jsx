import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import moment from 'moment';
import get from 'lodash/get';
import Table from '../../../core/form/Table';
import Tag from '../../../core/layout/Tag';
import Button from '../../../core/form/Button';

const ReceivedMessageList = props => (
  <Table
    rowKey={row => `${row.id}_${get(row, 'group', 'expander')}`}
    fetching={props.fetching}
    pagination={props.pagination}
    onChange={props.onChange}
    columns={[
      {
        label: 'Received At',
        path: 'sentAt',
        render: value => moment(value).format('DD/MM/YYYY HH:mm'),
        width: 150,
      },
      {
        label: 'Subject',
        path: 'subject',
        width: 250,
      },
      {
        label: 'Student',
        path: 'sender.name',
        width: 250,
      },
      {
        label: 'Message',
        path: 'message',
        render: text => <div dangerouslySetInnerHTML={{ __html: text }} />,
      },
      {
        label: 'Status',
        path: 'readAt',
        width: 120,
        align: 'center',
        render: value => <Tag color={value ? 'green' : 'red'}>{value ? 'Read' : 'Not Read'}</Tag>,
      },
      {
        label: 'Actions',
        path: 'action',
        width: 80,
        align: 'center',
        render: (value, row) => (
          <a href={`${window.location.origin}/messages/${row.id}/chat`} target="_blank" rel="noopener noreferrer">
            <Button icon="export" />
          </a>
        )
      },
    ]}
    rows={props.messages}
    selectable
    onSelect={row => browserHistory.push(`/messages/${row.id}/chat`)}
  />
);

ReceivedMessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  pagination: PropTypes.shape({
    current: PropTypes.number,
    total: PropTypes.number,
    pageSize: PropTypes.number,
  }).isRequired,
  fetching: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ReceivedMessageList;
