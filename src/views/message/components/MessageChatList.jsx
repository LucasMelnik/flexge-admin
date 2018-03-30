import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import get from 'lodash/get'
import MessageChatListItem from './MessageChatListItem';
import Separator from '../../../core/layout/Separator';

export default class MessageChatList extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };

  componentDidUpdate() {
    $('#chat-list').scrollTop($('#chat-list').prop('scrollHeight'));
  }

  render() {
    return (
      <div
        id="chat-list"
        style={{
          padding: 10,
          backgroundColor: '#f1f1f1',
          border: '1px solid #ececec',
          borderBottom: 'none',
          borderTop: 'none',
          maxHeight: 500,
          overflowY: 'auto',
        }}
      >
        {this.props.messages.map((message, index) => (
          <div>
            <MessageChatListItem
              key={message.id}
              message={message}
              shouldGroup={message.sender.id === get(this.props.messages[index + 1],'sender.id', '')}
            />
            {message.sender.id !== get(this.props.messages[index + 1],'sender.id', '') && (<Separator size="xs" />)}
          </div>
        ))}
      </div>
    );
  }
}
