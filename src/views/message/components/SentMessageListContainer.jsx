import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import SentMessageList from './SentMessageList';
import SentMessageListService from '../services/SentMessageListService';

class SentMessageListContainer extends Component {

  componentDidMount() {
    SentMessageListService.init();
  }

  render() {
    return (
      <SentMessageList
        messages={toJS(SentMessageListService.messages)}
        fetching={SentMessageListService.fetch.fetching}
        pagination={SentMessageListService.pagination}
        onChange={SentMessageListService.load}
      />
    );
  }
}

export default observer(SentMessageListContainer);
