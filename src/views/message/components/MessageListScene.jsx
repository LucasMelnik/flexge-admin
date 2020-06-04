import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Tabs from '../../../core/layout/Tabs';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import SentMessageListContainer from './SentMessageListContainer';
import Separator from '../../../core/layout/Separator';
import SentMessageListFilterContainer from './SentMessageListFilterContainer';
import ReceivedMessageListFilterContainer from './ReceivedMessageListFilterContainer';
import ReceivedMessageListContainer from './ReceivedMessageListContainer';
import UnReadeMessageCountContainer from './UnReadeMessageCountContainer';

const MessageListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Messages',
        },
      ]}
    />
    <Card>
      <Tabs
        actions={(
          <Button
            label="New Message"
            icon="plus"
            type="primary"
            onClick={() => browserHistory.push('/new-message')}
          />
        )}
        tabs={[
          {
            key: 'sent-tab',
            title: 'Sent',
            content: (
              <div>
                <Separator />
                <SentMessageListFilterContainer />
                <Separator />
                <SentMessageListContainer />
              </div>
             ),
          },
          {
            key: 'received-tab',
            title: (
              <UnReadeMessageCountContainer>
                Received
              </UnReadeMessageCountContainer>
           ),
            content: (
              <div>
                <Separator />
                <ReceivedMessageListFilterContainer />
                <Separator />
                <ReceivedMessageListContainer />
              </div>
             ),
          },
        ]}
      />
    </Card>
  </div>
);

export default MessageListScene;
