import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import ItemAudioList from './ItemAudioList';
import ItemAudioListService from '../services/ItemAudioListService';
import ItemAudioStatusService from '../services/ItemAudioStatusService';

class ItemAudioListContainer extends Component {

  componentDidMount() {
    ItemAudioListService.init();
  }

  render() {
    return (
      <ItemAudioList
        items={toJS(ItemAudioListService.items)}
        fetching={ItemAudioListService.fetch.fetching}
        pagination={toJS(ItemAudioListService.pagination)}
        onChange={ItemAudioListService.load}
        onAudioUpload={ItemAudioListService.handleAudioUpload}
        onChangeStatus={ItemAudioStatusService.init}
      />
    );
  }
}

export default observer(ItemAudioListContainer);
