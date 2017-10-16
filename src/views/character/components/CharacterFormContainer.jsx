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

  componentWillMount() {
    CharacterFormService.handleLoad(this.props.characterId);
  }

  render() {
    return (
      <CharacterForm
        onSubmit={CharacterFormService.handleSubmit}
        onChange={CharacterFormService.form.setValue}
        onReset={CharacterFormService.form.reset}
        values={CharacterFormService.form.getValues()}
        errors={CharacterFormService.form.errors}
        submitting={CharacterFormService.fetch.fetching}
        error={CharacterFormService.submit.error}
        isDirty={CharacterFormService.form.isDirty}
      />
    );
  }
}

export default observer(CharacterFormContainer);
