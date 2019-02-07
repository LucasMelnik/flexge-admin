import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import moment from 'moment';
import get from 'lodash/get';
import Table from '../../../core/form/Table';
import Button from '../../../core/form/Button';

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
        render: value => moment(value).format('DD/MM/YYYY HH:mm'),
        width: 160,
      },
      {
        label: 'Subject',
        path: 'subject',
      },
      {
        label: 'Actions',
        path: 'action',
        width: 80,
        align: 'center',
        render: (value, row) => (
          <Button
            icon="profile"
            onClick={() => Modal.info({
              content: (<span dangerouslySetInnerHTML={{ __html: row.message }} />),
              iconType: 'none',
              okText: 'Close',
              okType: 'default',
            })}
          />
        ),
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
