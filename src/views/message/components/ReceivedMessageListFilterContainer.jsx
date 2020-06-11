import React from 'react';
import { observer } from 'mobx-react';
import ReceivedMessageListService from '../services/ReceivedMessageListService';
import MessageListFilter from './MessageListFilter';

const ReceivedMessageListFilterContainer = () => (
  <MessageListFilter
    values={ReceivedMessageListService.filterForm.getValues()}
    onChange={ReceivedMessageListService.filterForm.setValue}
    onSearch={ReceivedMessageListService.load}
    fetching={ReceivedMessageListService.fetch.fetching}
    showStatusFilter={true}
  />
);

export default observer(ReceivedMessageListFilterContainer);
