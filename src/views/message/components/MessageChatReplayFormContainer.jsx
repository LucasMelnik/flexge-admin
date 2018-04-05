import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import MessageChatReplayForm from './MessageChatReplayForm';
import MessageChatReplayFormService from '../services/MessageChatReplayFormService';

class MessageChatReplayFormContainer extends Component {

  static propTypes = {
    messageChannelId: PropTypes.string.isRequired,
  };

  messageChatReplayFormService = new MessageChatReplayFormService();

  componentWillMount() {
    this.messageChatReplayFormService.init(this.props.messageChannelId);
  }

  render() {
    return (
      <MessageChatReplayForm
        onSubmit={this.messageChatReplayFormService.handleSubmit}
        onChange={this.messageChatReplayFormService.form.setValue}
        values={this.messageChatReplayFormService.form.getValues()}
        errors={this.messageChatReplayFormService.form.errors}
        submitting={this.messageChatReplayFormService.submit.fetching}
        isDirty={this.messageChatReplayFormService.form.isDirty}
      />
    );
  }
}

export default observer(MessageChatReplayFormContainer);
