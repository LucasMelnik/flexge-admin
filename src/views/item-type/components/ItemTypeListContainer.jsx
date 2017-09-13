import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import ItemTypeList from './ItemTypeList';
import ItemTypeListService from '../services/ItemTypeListService';

class ItemTypeListContainer extends Component {

  componentDidMount() {
    ItemTypeListService.init();
  }

  render() {
    return (
      <ItemTypeList
        items={toJS(ItemTypeListService.items)}
        fetching={ItemTypeListService.fetch.fetching}
        onDelete={ItemTypeListService.handleRemove}
      />
    );
  }
}

export default observer(ItemTypeListContainer);
