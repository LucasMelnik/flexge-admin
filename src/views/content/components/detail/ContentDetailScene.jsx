import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Card from '../../../../core/layout/Card';
import Breadcrumb from '../../../../core/layout/Breadcrumb';
import ContentItemListContainer from './ContentItemListContainer';
import Button from '../../../../core/form/Button';
import ContentDetailFilterContainer from './ContentDetailFilterContainer';
import ColumnSeparator from '../../../../core/layout/ColumnSeparator';

const ContentDetailScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Content Details',
        },
      ]}
    />
    <Card
      title="Content Details"
      actions={
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            height: 30,
          }}
        >
          <ContentDetailFilterContainer />
          <ColumnSeparator size="xs" />
          <Button
            icon="arrow-left"
            label="Back"
            onClick={() => browserHistory.push('/contents')}
          />
        </div>
      }
    >
      <ContentItemListContainer contentId={props.params.contentId} />
    </Card>
  </div>
);

ContentDetailScene.propTypes = {
  params: PropTypes.shape({
    contentId: PropTypes.string,
  }).isRequired,
};

export default ContentDetailScene;
