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
          text: `${props.params.characterId ? 'Edit Character' : 'Create Character'}`,
        },
      ]}
    />
    <Card
      title={props.params.characterId ? 'Edit Character' : 'Create Character'}
      actions={
        (
          <Button
            icon="arrow-left"
            label="Back"
            type="default"
            onClick={() => browserHistory.goBack()}
          />
        )
      }
    >
      <CharacterFormContainer characterId={props.params.characterId} />
    </Card>
  </div>
);

CharacterFormScene.propTypes = {
  params: PropTypes.shape({
    characterId: PropTypes.string,
  }),
};

CharacterFormScene.defaultProps = {
  params: null,
};

export default CharacterFormScene;
