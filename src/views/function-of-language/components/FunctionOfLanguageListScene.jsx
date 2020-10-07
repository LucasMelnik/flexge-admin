import React from 'react';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import FunctionOfLanguageListFilterContainer from './FunctionOfLanguageListFilterContainer';
import FunctionOfLanguageListContainer from './FunctionOfLanguageListContainer';

const FunctionOfLanguageListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Functions of Language',
        },
      ]}
    />
    <Card
      title="Functions of Language"
      actions={
        <Button
          type="primary"
          label="New Function of Language"
          icon="plus"
          onClick={() => browserHistory.push('/functions-of-language/new')}
        />
      }
    >
      <FunctionOfLanguageListFilterContainer/>
      <FunctionOfLanguageListContainer/>
    </Card>
  </div>
);

export default FunctionOfLanguageListScene;
