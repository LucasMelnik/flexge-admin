import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import ItemByWordsList from './ItemByWordsList';
import ItemByWordsListService from '../../services/ItemByWordsListService';

class UnitItemErrorRecordListContainer extends Component {

  componentDidMount() {
    ItemByWordsListService.init();
  }

  render() {
    return (
      <ItemByWordsList
        items={toJS(ItemByWordsListService.items)}
        fetching={ItemByWordsListService.fetch.fetching}
      />
    );
  }
}

export default observer(UnitItemErrorRecordListContainer);
