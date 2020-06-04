import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import MessageChatList from './MessageChatList';
import MessageChatListService from '../services/MessageChatListService';

class MessageChatListContainer extends Component {
  static propTypes = {
    messageChannelId: PropTypes.string.isRequired,
  };

  messageChatListService = new MessageChatListService();
  componentWillMount() {
    this.messageChatListService.init(this.props.messageChannelId);
  }

  render() {
    return (
      <MessageChatList
        messages={toJS(this.messageChatListService.messages)}
        onMarkAsRead={this.messageChatListService.markAsRead}
      />
    );
  }
}

export default observer(MessageChatListContainer);
