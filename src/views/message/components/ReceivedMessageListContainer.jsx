import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import ReceivedMessageList from './ReceivedMessageList';
import ReceivedMessageListService from '../services/ReceivedMessageListService';

class ReceivedMessageListContainer extends Component {

  componentDidMount() {
    ReceivedMessageListService.init();
  }

  render() {
    return (
      <ReceivedMessageList
        messages={toJS(ReceivedMessageListService.messages)}
        fetching={ReceivedMessageListService.fetch.fetching}
        pagination={ReceivedMessageListService.pagination}
        onChange={ReceivedMessageListService.load}
      />
    );
  }
}

export default observer(ReceivedMessageListContainer);
