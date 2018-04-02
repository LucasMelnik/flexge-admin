import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import MessageFormContainer from './MessageFormContainer';
import Button from '../../../core/form/Button';

const MessageFormScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Messages',
          link: '/messages'
        },
        {
          text: 'New Message',
        },
      ]}
    />
    <Card
      title="New Message"
      actions={(
        <Button
          icon="arrow-left"
          label="Back"
          type="default"
          onClick={() => browserHistory.push('/messages')}
        />
      )}
    >
      <MessageFormContainer />
    </Card>
  </div>
);

export default MessageFormScene;
