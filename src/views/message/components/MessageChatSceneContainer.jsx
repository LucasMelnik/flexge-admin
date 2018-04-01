import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import MessageChatScene from './MessageChatScene';
import MessageChatLoadService from '../services/MessageChatLoadService';
import Async from '../../../core/layout/Async';

class MessageChatSceneContainer extends Component {
  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  };

  messageChatLoadService = new MessageChatLoadService();
  componentWillMount() {
    this.messageChatLoadService.handleLoad(this.props.params.id);
  }

  render() {
    return (
      <Async fetching={this.messageChatLoadService.fetch.fetching}>
        <MessageChatScene
          messageChannel={this.messageChatLoadService.messageChannel}
          fetching={this.messageChatLoadService.fetch.fetching}
        />
      </Async>
    );
  }
}

export default observer(MessageChatSceneContainer);
