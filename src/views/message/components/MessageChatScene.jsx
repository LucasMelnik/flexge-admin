import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import moment from 'moment';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import MessageChatListContainer from './MessageChatListContainer';
import MessageChatReplayFormContainer from './MessageChatReplayFormContainer';

const MessageChatScene = props => (
  <div>
    <Breadcrumb
      fetching={props.fetching}
      crumbs={[
        {
          text: 'Messages',
        },
        {
          text: `Subject: ${props.messageChannel.subject}`,
        },
        {
          text: 'Chat',
        },
      ]}
    />
    <Card
      title={`Subject:${props.messageChannel.subject} - from: ${moment(props.messageChannel.sentAt).format('DD/MM/YYYY HH:mm')}`}
      loading={props.fetching}
      actions={(
        <Button
          icon="arrow-left"
          label="Back"
          type="default"
          onClick={() => browserHistory.push('/messages')}
        />
      )}
    >
      {props.messageChannel.id && [
        <MessageChatListContainer
          key="message-list"
          messageChannelId={props.messageChannel.id}
        />,
        <MessageChatReplayFormContainer
          key="message-reply-form"
          messageChannelId={props.messageChannel.id}
        />,
      ]}
    </Card>
  </div>
);

MessageChatScene.propTypes = {
  messageChannel: PropTypes.shape({
    id: PropTypes.string,
    subject: PropTypes.string,
    sentAt: PropTypes.string,
  }).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default MessageChatScene;
