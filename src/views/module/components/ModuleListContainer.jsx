import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import ModuleList from './ModuleList';
import ModuleListService from '../services/ModuleListService';

class ModuleListContainer extends Component {

  componentDidMount() {
    ModuleListService.init();
  }

  render() {
    return (
      <ModuleList
        modules={toJS(ModuleListService.modules)}
        fetching={ModuleListService.fetch.fetching}
        onDelete={ModuleListService.handleRemove}
      />
    );
  }
}

export default observer(ModuleListContainer);
