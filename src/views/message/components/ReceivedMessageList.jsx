import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import moment from 'moment';
import Table from '../../../core/form/Table';
import Tag from '../../../core/layout/Tag';
import Button from '../../../core/form/Button';
import Separator from '../../../core/layout/Separator';
import { Roles } from '../../../core/util';
import Icon from '../../../core/layout/Icon';

const ReceivedMessageList = props => {
  const canGroupMessages = [Roles.ADMIN, Roles.SUPPORT].some(r => r === localStorage.role);
  return (
    <div>
      {canGroupMessages && (
        <div>
          <Button
            buttonType="button"
            disabled={props.fetching || !props.selectedRows.length}
            label="Group selected messages"
            size="sm"
            onClick={props.onGroupMessages}
            type="danger"
          />
          <Separator size="xs" />
        </div>
      )}
      <Table
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
            label: '',
            path: 'studentAccess',
            width: 30,
            render: value => !!value ?
                (value.os === 'ios' || value.os === 'android') ? (
                  <Icon name="mobile" />
                ) : (
                  <Icon name="desktop" />
                )
              : '-'
          },
          {
            label: 'School',
            path: 'sender.schoolClass.school.name',
            width: 200,
          },
          {
            label: 'Student',
            path: 'sender.name',
            width: 250,
          },
          {
            label: 'Subject',
            path: 'subject',
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
            render: (value, row) => (
              <Tag color={row.members.length ? (value ? 'green' : 'red') : 'none'}>
                {row.members.length ? (value ? 'Read' : 'Not Read') : 'Open'}
              </Tag>
            ),
          },
          {
            label: 'Actions',
            path: 'action',
            width: localStorage.role === Roles.SUPPORT ? 100 : 70,
            align: 'center',
            render: (value, row) => (
              <div>
                <a href={`${window.location.origin}/messages/${row.id}/chat`} target="_blank" rel="noopener noreferrer">
                  <Button icon="export" />
                </a>
                {' '}
                {localStorage.role === Roles.SUPPORT && !row.members.length && (
                  <Button
                    icon="user-add"
                    onClick={() => props.onAssign(row)}
                  />
                )}
              </div>
            )
          },
        ]}
        rows={props.messages}
        selectable
        onSelect={row => browserHistory.push(`/messages/${row.id}/chat`)}
        onSelectRows={canGroupMessages ? props.onSelectRows : null}
        selectedRows={canGroupMessages ? props.selectedRows : null}
      />
    </div>
  );
}

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
  selectedRows: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectRows: PropTypes.func.isRequired,
  onGroupMessages: PropTypes.func.isRequired,
  onAssign: PropTypes.func.isRequired,
};

export default ReceivedMessageList;
