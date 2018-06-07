import React from 'react';
import { observer } from 'mobx-react';
import SentMessageListService from '../services/SentMessageListService';
import MessageListFilter from './MessageListFilter';

const SentMessageListFilterContainer = () => (
  <MessageListFilter
    values={SentMessageListService.filterForm.getValues()}
    onChange={SentMessageListService.filterForm.setValue}
    onSearch={SentMessageListService.load}
    fetching={SentMessageListService.fetch.fetching}
  />
);

export default observer(SentMessageListFilterContainer);
