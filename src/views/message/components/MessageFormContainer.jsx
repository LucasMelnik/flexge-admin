import React, { Component } from 'react';
import { observer } from 'mobx-react';
import MessageForm from './MessageForm';
import MessageFormService from '../services/MessageFormService';

class MessageFormContainer extends Component {

  messageFormService = new MessageFormService();

  render() {
    return (
      <MessageForm
        onSubmit={this.messageFormService.handleSubmit}
        onChange={this.messageFormService.form.setValue}
        onReset={this.messageFormService.form.reset}
        values={this.messageFormService.form.getValues()}
        errors={this.messageFormService.form.errors}
        submitting={this.messageFormService.submit.fetching}
        isDirty={this.messageFormService.form.isDirty}
      />
    );
  }
}

export default observer(MessageFormContainer);
