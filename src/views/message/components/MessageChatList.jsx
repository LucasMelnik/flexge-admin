import React from 'react';
import PropTypes from 'prop-types';
import MessageChatListItem from './MessageChatListItem';
import MessageChatReplayFormContainer from './MessageChatReplayFormContainer';

const MessageChatList = props => (
  <div
    style={{
      padding: 0,
      backgroundColor: '#ecebeb59',
      border: '1px solid #ececec',
      borderRadius: 3,
      maxHeight: 500,
      overflowY: 'auto',
    }}
  >
    {props.messages.map(message => (
      <MessageChatListItem
        key={message.id}
        message={message}
      />
    ))}
    <MessageChatReplayFormContainer messageChannelId={props.messageChannelId} />
  </div>
);

MessageChatList.propTypes = {
  messageChannelId: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default MessageChatList;
