import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import FunctionOfLanguageFormContainer from './FunctionOfLanguageFormContainer';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';

const FunctionOfLanguageFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: `${props.params.functionId ? 'Edit Function of Language' : 'Create Function of Language'}`,
        },
      ]}
    />
    <Card
      title={props.params.functionId ? 'Edit Function of Language' : 'Create Function of Language'}
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
      <FunctionOfLanguageFormContainer functionId={props.params.functionId}/>
    </Card>
  </div>
);

FunctionOfLanguageFormScene.propTypes = {
  params: PropTypes.shape({
    functionId: PropTypes.string,
  }),
};

FunctionOfLanguageFormScene.defaultProps = {
  params: null,
};

export default FunctionOfLanguageFormScene;
