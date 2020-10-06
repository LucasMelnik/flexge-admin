import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import GrammarFormContainer from './GrammarFormContainer';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';

const GrammarFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: `${props.params.grammarId ? 'Edit Grammar' : 'Create Grammar'}`,
        },
      ]}
    />
    <Card
      title={props.params.grammarId ? 'Edit Grammar' : 'Create Grammar'}
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
      <GrammarFormContainer grammarId={props.params.grammarId}/>
    </Card>
  </div>
);

GrammarFormScene.propTypes = {
  params: PropTypes.shape({
    grammarId: PropTypes.string,
  }),
};

GrammarFormScene.defaultProps = {
  params: null,
};

export default GrammarFormScene;
