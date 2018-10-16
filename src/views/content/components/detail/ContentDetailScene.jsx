import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import get from 'lodash/get';
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
      title={`${get(props.unit, 'module.course.name', '')} - ${get(props.unit, 'module.name', '')} - ${get(props.unit, 'name', '')}`}
      loading={props.fetching}
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
      {get(props.unit, 'id', false) && (
        <ContentItemListContainer contentId={get(props.unit, 'id', '')} />
      )}
    </Card>
  </div>
);

ContentDetailScene.propTypes = {
  unit: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default ContentDetailScene;
