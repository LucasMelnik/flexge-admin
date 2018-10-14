import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import StateList from './StateList';
import StateListService from '../services/StateListService';

class StateListContainer extends Component {

  componentDidMount() {
    StateListService.init();
  }

  render() {
    return (
      <StateList
        states={toJS(StateListService.states)}
        fetching={StateListService.fetch.fetching}
        onDelete={StateListService.handleRemove}
      />
    );
  }
}

export default observer(StateListContainer);
