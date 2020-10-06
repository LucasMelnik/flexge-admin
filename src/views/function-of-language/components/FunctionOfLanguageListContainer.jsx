import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import FunctionOfLanguageList from './FunctionOfLanguageList';
import FunctionOfLanguageListService from '../services/FunctionOfLanguageListService';

class FunctionOfLanguageListContainer extends Component {

  componentDidMount() {
    FunctionOfLanguageListService.init();
  }

  render() {
    return (
      <FunctionOfLanguageList
        functions={toJS(FunctionOfLanguageListService.functions)}
        fetching={FunctionOfLanguageListService.fetch.fetching}
        onDelete={FunctionOfLanguageListService.handleRemove}
      />
    );
  }
}

export default observer(FunctionOfLanguageListContainer);
