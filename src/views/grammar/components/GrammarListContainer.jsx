import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import GrammarList from './GrammarList';
import GrammarListService from '../services/GrammarListService';

class GrammarListContainer extends Component {

  componentDidMount() {
    GrammarListService.init();
  }

  render() {
    return (
      <GrammarList
        grammars={toJS(GrammarListService.grammars)}
        fetching={GrammarListService.fetch.fetching}
      />
    );
  }
}

export default observer(GrammarListContainer);
