import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import moment from 'moment';
import get from 'lodash/get';
import Table from '../../../core/form/Table';

const ReceivedMessageList = props => (
  <Table
    rowKey={(row) => `${row.id}_${get(row, 'group', 'expander')}`}
    fetching={props.fetching}
    pagination={props.pagination}
    onChange={props.onChange}
    columns={[
      {
        label: 'Date',
        path: 'sentAt',
        render: value => moment(value).format('DD/MM/YYYY HH:mm'),
        width: 160,
      },
      {
        label: 'Subject',
        path: 'subject',
      },
      {
        label: 'Message',
        path: 'message',
        render: text => (<div dangerouslySetInnerHTML={{ __html: text }} />),
      },
      {
        label: 'Status',
        path: 'readAt',
        render: value => (value ? 'Read' : 'Not Read'),
      },
    ]}
    rows={props.messages}
    selectable
    onSelect={row => browserHistory.push(`/messages/${row.id}/chat`)}
  />
);

ReceivedMessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  pagination: PropTypes.shape({
    current: PropTypes.number,
    total: PropTypes.number,
    pageSize: PropTypes.number,
  }).isRequired,
  fetching: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ReceivedMessageList;
