import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import StateFormContainer from './StateFormContainer';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';

const StateFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: `${props.params.stateId ? 'Edit State' : 'Create State'}`,
        },
      ]}
    />
    <Card
      title={props.params.stateId ? 'Edit State' : 'Create State'}
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
      <StateFormContainer stateId={props.params.stateId} />
    </Card>
  </div>
);

StateFormScene.propTypes = {
  params: PropTypes.shape({
    stateId: PropTypes.string,
  }),
};

StateFormScene.defaultProps = {
  params: null,
};

export default StateFormScene;
