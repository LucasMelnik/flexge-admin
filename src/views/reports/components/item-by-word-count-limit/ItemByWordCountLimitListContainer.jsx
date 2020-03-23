import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import ItemByWordCountLimitList from './ItemByWordCountLimitList';
import ItemByWordCountLimitListService from '../../services/ItemByWordCountLimitListService';

class ItemByWordCountLimitListContainer extends Component {

  componentDidMount() {
    ItemByWordCountLimitListService.init();
  }

  render() {
    return (
      <ItemByWordCountLimitList
        items={toJS(ItemByWordCountLimitListService.items)}
        pagination={toJS(ItemByWordCountLimitListService.pagination)}
        onChange={ItemByWordCountLimitListService.load}
        fetching={ItemByWordCountLimitListService.fetch.fetching}
      />
    );
  }
}

export default observer(ItemByWordCountLimitListContainer);
