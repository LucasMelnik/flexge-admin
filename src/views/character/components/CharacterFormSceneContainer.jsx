import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CharacterFormScene from './CharacterFormScene';

class CharacterFormSceneContainer extends Component {

  static propTypes = {
    params: PropTypes.shape({
      characterId: PropTypes.string,
    }).isRequired,
  };

  render() {
    return (
      <CharacterFormScene
        characterId={this.props.params.characterId}
      />
    );
  }
}

export default observer(CharacterFormSceneContainer);
