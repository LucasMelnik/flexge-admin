import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import WhitelabelConfigList from './WhitelabelConfigList';
import WhitelabelConfigListService from '../services/WhitelabelConfigListService';

class WhitelabelConfigListContainer extends Component {

  componentDidMount() {
    WhitelabelConfigListService.init();
  }

  render() {
    return (
      <WhitelabelConfigList
        configs={toJS(WhitelabelConfigListService.configs)}
        fetching={WhitelabelConfigListService.fetch.fetching}
        onDelete={WhitelabelConfigListService.handleRemove}
      />
    );
  }
}

export default observer(WhitelabelConfigListContainer);
