import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Button from '../../../core/form/Button';
import PracticeTestFormContainer from './PracticeTestFormContainer';
import Card from '../../../core/layout/Card';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Separator from '../../../core/layout/Separator';

const PracticeTestFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: props.params.practiceTestId ? 'Edit Practice Test' : 'New Practice Test',
        }
      ]}
    />
    <Card
      title={props.params.practiceTestId ? 'Practice Test informations' : 'New Practice Test'}
      actions={
        <Button
          label="Back"
          icon="fa-arrow-left"
          onClick={() => browserHistory.push('/practice-tests')}
        />
      }
    >
      <PracticeTestFormContainer
        practiceTestId={props.params.practiceTestId}
      />
    </Card>
    <Separator size="md" />
    {/* {(props.params.practiceTestId) && (
      <PracticeTestItems practiceTestId={props.params.practiceTestId} />
    )} */}
  </div>
);

PracticeTestFormScene.propTypes = {
  params: PropTypes.shape({
    practiceTestId: PropTypes.string,
  }).isRequired,
};

export default PracticeTestFormScene;
