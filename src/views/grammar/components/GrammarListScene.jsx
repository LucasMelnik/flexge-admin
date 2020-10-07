import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import GrammarListFilterContainer from './GrammarListFilterContainer';
import GrammarListContainer from './GrammarListContainer';

const GrammarListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Grammars',
        },
      ]}
    />
    <Card
      title="Grammars"
      actions={
        <Button
          type="primary"
          label="New grammar"
          icon="plus"
          onClick={() => browserHistory.push('/grammars/new')}
        />
      }
    >
      <GrammarListFilterContainer/>
      <GrammarListContainer/>
    </Card>
  </div>
);

export default GrammarListScene;
