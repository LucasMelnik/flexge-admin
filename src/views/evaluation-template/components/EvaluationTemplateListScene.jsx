import React from 'react';
import { browserHistory } from 'react-router';
import Button from '../../../core/form/Button';
import Card from '../../../core/layout/Card';
import Separator from '../../../core/layout/Separator';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import EvaluationTemplateListContainer from './EvaluationTemplateListContainer';
import EvaluationTemplateListFilterContainer from './EvaluationTemplateListFilterContainer';

const EvaluationTemplateListScene = () => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Evaluation Templates',
        },
      ]}
    />
    <Card
      title="Evaluations Templates"
      actions={(
        <Button
          type="primary"
          icon="plus"
          onClick={() => browserHistory.push('/evaluation-templates/new')}
          label="New template"
        />
      )}
    >
      <EvaluationTemplateListFilterContainer />
      <Separator />
      <EvaluationTemplateListContainer />
    </Card>
  </div>
);

export default EvaluationTemplateListScene;
