import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import CharacterListFilterContainer from './CharacterListFilterContainer';
import CharacterListContainer from './CharacterListContainer';

const CharacterListScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Characters',
        },
      ]}
    />
    <Card
      title="Characters"
      actions={
        <Button
          label="New character"
          icon="fa-plus"
          onClick={() => browserHistory.push('/characters/new')}
        />
      }
    >
      <CharacterListFilterContainer />
      <CharacterListContainer />
    </Card>
  </div>
);

export default CharacterListScene;
