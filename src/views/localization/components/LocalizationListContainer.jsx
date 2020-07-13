import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import LocalizationList from './LocalizationList';
import LocalizationListService from '../services/LocalizationListService';

class LocalizationListContainer extends Component {

  componentDidMount() {
    LocalizationListService.init();
  }

  render() {
    return (
      <LocalizationList
        items={toJS(LocalizationListService.items)}
        fetching={LocalizationListService.fetch.fetching}
        onDelete={LocalizationListService.handleRemove}
        onSave={LocalizationListService.handleSave}
      />
    );
  }
}

export default observer(LocalizationListContainer);
