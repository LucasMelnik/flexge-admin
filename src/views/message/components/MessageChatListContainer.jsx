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

  componentWillMount() {
    MessageChatListService.init(this.props.messageChannelId);
  }

  render() {
    return (
      <MessageChatList
        messages={toJS(MessageChatListService.messages)}
      />
    );
  }
}

export default observer(MessageChatListContainer);
