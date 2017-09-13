import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import FormService from '../../../core/services/FormService';
import AudioMessageForm from './AudioMessageForm';
import { isRequired } from '../../../core/validations/index';

class AudioMessageFormContainer extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  state = { currentState: 'LIST' };

  formService = new FormService();

  handleAddMessage = () => {
    this.formService.validations = {
      text: [isRequired],
    };
    this.formService.setInitialValues({});
    this.formService.reset();
    this.setState({
      currentState: 'FORM',
    });
  };

  handleEditMessage = (message) => {
    this.formService.validations = {
      text: [isRequired],
    };
    this.formService.setInitialValues(message);
    this.formService.reset();
    this.setState({
      currentState: 'FORM',
    });
  };

  handleSaveMessage = () => {
    let messages = [];
    const messageId = this.formService.getValue('id');

    if (messageId) {
      messages = this.props.messages.map(message => {
        if (message.id === messageId) {
          return this.formService.getValues();
        }
        return message;
      });
    } else {
      messages = [
        ...this.props.messages,
        {
          ...this.formService.getValues(),
        },
      ];
    }

    this.props.onChange(messages);
    this.setState({
      currentState: 'LIST',
    });

    this.formService.setInitialValues({});
    this.formService.reset();
  };

  handleDeleteMessage = (messageToRemove) => {
    const messages = this.props.messages.filter(message => message.text !== messageToRemove.text);
    this.props.onChange(messages);
  };

  handleDiscard = () => {
    this.setState({
      currentState: 'LIST',
    });

    this.formService.setInitialValues({});
    this.formService.reset();
  };

  render() {
    return (
      <AudioMessageForm
        messages={this.props.messages}
        onDiscard={this.handleDiscard}
        onNew={this.handleAddMessage}
        onEdit={this.handleEditMessage}
        onSave={this.handleSaveMessage}
        onDelete={this.handleDeleteMessage}
        showForm={this.state.currentState === 'FORM'}
        values={this.formService.getValues()}
        onChange={this.formService.setValue}
        errors={this.formService.errors}
        title={this.props.title}
      />
    );
  }
}

export default observer(AudioMessageFormContainer);
