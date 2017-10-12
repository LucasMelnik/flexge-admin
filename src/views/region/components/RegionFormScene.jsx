import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import RegionFormContainer from './RegionFormContainer';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';

const RegionFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: `${props.regionId ? 'Edit Region' : 'Create Region'}`,
        },
      ]}
    />
    <Card
      title={props.regionId ? 'Edit Region' : 'Create Region'}
      actions={
        (
          <Button
            icon="fa-arrow-left"
            label="Back"
            type="default"
            onClick={() => browserHistory.goBack()}
          />
        )
      }
    >
      <RegionFormContainer regionId={props.regionId} />
    </Card>
  </div>
);

RegionFormScene.propTypes = {
  regionId: PropTypes.string,
};

RegionFormScene.defaultProps = {
  regionId: null,
};

export default RegionFormScene;
