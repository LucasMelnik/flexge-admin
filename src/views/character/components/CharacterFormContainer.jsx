import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CharacterForm from './CharacterForm';
import CharacterFormService from '../services/CharacterFormService';

class CharacterFormContainer extends Component {

  static propTypes = {
    characterId: PropTypes.string,
  };

  static defaultProps = {
    characterId: null,
  };

  characterFormService = new CharacterFormService();
  componentWillMount() {
    this.characterFormService.handleLoad(this.props.characterId);
  }

  render() {
    return (
      <CharacterForm
        onSubmit={this.characterFormService.handleSubmit}
        onChange={this.characterFormService.form.setValue}
        onReset={this.characterFormService.form.reset}
        values={this.characterFormService.form.getValues()}
        errors={this.characterFormService.form.errors}
        submitting={this.characterFormService.fetch.fetching}
        isDirty={this.characterFormService.form.isDirty}
      />
    );
  }
}

export default observer(CharacterFormContainer);
