import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Tabs from '../../../core/layout/Tabs';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import SentMessageListContainer from './SentMessageListContainer';
import Separator from '../../../core/layout/Separator';
import SentMessageListFilterContainer from './SentMessageListFilterContainer';

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
            title: 'Messages Sent',
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
            title: 'Messages Received',
            content: <div />,
          },
        ]}
      />
    </Card>
  </div>
);

export default MessageListScene;
