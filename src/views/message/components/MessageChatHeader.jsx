import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const MessageChatHeader = props => (
  <div
    style={{
      padding: 10,
      border: '1px solid #ececec',
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
    }}
  >
    <span
      style={{
        fontSize: 22,
        color: 'green',
      }}
    >
      {props.members.reduce((acc, member) => acc.concat(' ').concat(member.name), '')}
    </span>
    <br />
    <span>Subject: {props.subject}</span>
    <br />
    <span>Since: {moment(props.startedAt).format('DD/MM/YYYY HH:mm')}</span>
  </div>
);

MessageChatHeader.propTypes = {
  subject: PropTypes.string.isRequired,
  startedAt: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default MessageChatHeader;
