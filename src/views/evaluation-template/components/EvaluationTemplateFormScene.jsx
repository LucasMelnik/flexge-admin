import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Button from '../../../core/form/Button';
import Card from '../../../core/layout/Card';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import EvaluationTemplateFormContainer from './EvaluationTemplateFormContainer';
import Separator from '../../../core/layout/Separator';
import EvaluationPeriodListContainer from './evaluation-period/EvaluationPeriodListContainer';
import EvaluationPeriodFormContainer from './evaluation-period/EvaluationPeriodFormContainer';

const EvaluationTemplateFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Evaluation Templates',
        },
        {
          text: props.params.evaluationTemplateId ? 'Update Evaluation Template' : 'New Evaluation Template',
        },
      ]}
    />
    <Card
      title={props.params.evaluationTemplateId ? 'Update Evaluation Template' : 'New Evaluation Template'}
      actions={(
        <Button
          icon="arrow-left"
          label="Back"
          onClick={() => browserHistory.push('/evaluation-templates')}
        />
      )}
    >
      <EvaluationTemplateFormContainer evaluationTemplateId={props.params.evaluationTemplateId} />
    </Card>
    {props.params.evaluationTemplateId && [
      <Separator key="separator" />,
      <Card
        key="content"
        title="Evaluation Periods"
      >
        <EvaluationPeriodFormContainer evaluationTemplateId={props.params.evaluationTemplateId} />
        <Separator />
        <EvaluationPeriodListContainer evaluationTemplateId={props.params.evaluationTemplateId} />
      </Card>,
    ]}
  </div>
);

EvaluationTemplateFormScene.propTypes = {
  params: PropTypes.shape({
    evaluationTemplateId: PropTypes.string,
  }),
};

EvaluationTemplateFormScene.defaultProps = {
  params: {},
};

export default EvaluationTemplateFormScene;
