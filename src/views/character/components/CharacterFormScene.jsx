import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import CharacterFormContainer from './CharacterFormContainer';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';

const CharacterFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: `${props.characterId ? 'Edit Character' : 'Create Character'}`,
        },
      ]}
    />
    <Card
      title={props.characterId ? 'Edit Character' : 'Create Character'}
      actions={
        (
          <Button
            icon="fa-arrow-left"
            label="Back"
            type="default"
            onClick={() => browserHistory.goBack()}
          />
        )
      }
    >
      <CharacterFormContainer characterId={props.characterId} />
    </Card>
  </div>
);

CharacterFormScene.propTypes = {
  characterId: PropTypes.string,
};

CharacterFormScene.defaultProps = {
  characterId: null,
};

export default CharacterFormScene;
