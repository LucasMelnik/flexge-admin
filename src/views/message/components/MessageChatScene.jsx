import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import MessageChatListContainer from './MessageChatListContainer';
import MessageChatReplayFormContainer from './MessageChatReplayFormContainer';
import MessageChatHeader from './MessageChatHeader';

const MessageChatScene = props => (
  <div>
    <Breadcrumb
      fetching={props.fetching}
      crumbs={[
        {
          text: 'Messages',
          link: '/messages'
        },
        {
          text: 'Chat',
        },
      ]}
    />
    <Card
      title="Messages History"
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
        <MessageChatHeader
          key="message-chat-header"
          subject={props.messageChannel.subject}
          startedAt={props.messageChannel.sentAt}
          members={props.messageChannel.members}
        />,
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
    members: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default MessageChatScene;
