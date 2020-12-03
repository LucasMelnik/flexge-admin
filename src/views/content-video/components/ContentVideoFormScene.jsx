import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import ContentVideoFormContainer from './ContentVideoFormContainer';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';

const ContentVideoFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: `${props.contentVideoId ? 'Edit Content Video' : 'Create Content Video'}`,
        },
      ]}
    />
    <Card
      title={props.contentVideoId ? 'Edit Content Video' : 'Create Content Video'}
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
      <ContentVideoFormContainer contentVideoId={props.contentVideoId}/>
    </Card>
  </div>
);

ContentVideoFormScene.propTypes = {
  contentVideoId: PropTypes.string,
};

export default ContentVideoFormScene;
