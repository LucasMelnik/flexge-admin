import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CharacterList from './CharacterList';
import CharacterListService from '../services/CharacterListService';

class CharacterListContainer extends Component {

  componentDidMount() {
    CharacterListService.init();
  }

  render() {
    return (
      <CharacterList
        characters={toJS(CharacterListService.characters)}
        fetching={CharacterListService.fetch.fetching}
        onDelete={CharacterListService.handleRemove}
      />
    );
  }
}

export default observer(CharacterListContainer);
