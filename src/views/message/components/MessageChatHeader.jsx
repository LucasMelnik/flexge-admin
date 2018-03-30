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
    <h4>Subject: {props.subject}</h4>
    <h5>With: {props.members.reduce((acc, member) => acc.concat(' ').concat(member.name), '')}</h5>
    <span>Since: {moment(props.startedAt).format('DD/MM/YYYY HH:mm')}</span>
  </div>
);

MessageChatHeader.propTypes = {
  subject: PropTypes.string.isRequired,
  startedAt: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default MessageChatHeader;
