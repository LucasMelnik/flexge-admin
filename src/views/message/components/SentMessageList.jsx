import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import get from 'lodash/get';
import Table from '../../../core/form/Table';

const SentMessageList = props => (
  <Table
    rowKey={(row) => `${row.id}_${get(row, 'group', 'expander')}`}
    fetching={props.fetching}
    pagination={props.pagination}
    onChange={props.onChange}
    columns={[
      {
        label: 'Date',
        path: 'sentAt',
        render: (value, row) => row.children ? moment(value).format('DD/MM/YYYY HH:mm') : '',
        width: 160,
      },
      {
        label: 'Subject',
        path: 'subject',
        render: (value, row) => row.children ? value : row.name,
      },
      {
        label: 'Message',
        path: 'message',
        render: (text, row) => row.children ? (<div dangerouslySetInnerHTML={{ __html: text }} />) : row.schoolClass.name,
      },
      {
        label: 'Status',
        path: 'readAt',
        render: (value, row) => row.children ? '' : (row.readAt ? 'Read' : 'Not Read'),
      },
    ]}
    rows={props.messages}
  />
);

SentMessageList.propTypes = {
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

export default SentMessageList;
