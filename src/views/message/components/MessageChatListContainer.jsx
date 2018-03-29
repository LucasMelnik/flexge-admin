import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import MessageChatList from './MessageChatList';
import MessageChatListService from '../services/MessageChatListService';
import Async from '../../../core/layout/Async';

class MessageChatListContainer extends Component {
  static propTypes = {
    messageChannelId: PropTypes.string.isRequired,
  };

  componentWillMount() {
    MessageChatListService.init(this.props.messageChannelId);
  }

  render() {
    return (
      <Async fetching={MessageChatListService.fetch.fetching}>
        <MessageChatList
          messages={toJS(MessageChatListService.messages)}
        />
      </Async>
    );
  }
}

export default observer(MessageChatListContainer);
