import React from 'react';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock';
import { browserHistory } from 'react-router';
import Title from '../../../core/content/Title';
import Separator from '../../../core/layout/Separator';
import PlacementTestFormContainer from './PlacementTestFormContainer';
import Button from '../../../core/form/Button';
import PlacementTestItems from './PlacementTestItems';

const PlacementTestFormScene = props => (
  <div>
    <InlineBlock>
      <Title>
        {props.placementTestId ? (
          'Grammar informations'
        ) : (
          'New Grammar'
        )}
      </Title>
    </InlineBlock>
    <Button
      primary
      label="Back"
      icon="arrow_back"
      style={{
        position: 'relative',
        float: 'right',
      }}
      onClick={() => browserHistory.push('/placement-test')}
    />
    <Separator size="sm" />
    <PlacementTestFormContainer />
    <Separator size="sm" />
    {props.placementTestId && (
      <PlacementTestItems placementTestId={props.placementTestId} />
    )}
  </div>
);

PlacementTestFormScene.propTypes = {
  studentId: PropTypes.string,
};
PlacementTestFormScene.defaultProps = {
  studentId: null,
};

export default PlacementTestFormScene;
