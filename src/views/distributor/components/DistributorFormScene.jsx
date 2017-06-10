import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Block from 'jsxstyle/Block';
import InlineBlock from 'jsxstyle/InlineBlock';
import Title from '../../../core/content/Title';
import FloatActionButton from '../../../core/form/FloatActionButton';
import Separator from '../../../core/layout/Separator';
import DistributorFormContainer from './DistributorFormContainer';
import DistributorManagerScene from '../../distributor-manager/components/DistributorManagerScene';

const DistributorFormScene = props => (
  <div>
    <InlineBlock>
      <Title>
        {props.distributorId ? (
          'Distributor Informations'
        ) : (
          'New Distributor'
        )}
      </Title>
    </InlineBlock>
    <FloatActionButton
      secondary
      icon="arrow_back"
      style={{
        position: 'relative',
        float: 'right',
        top: 20,
        right: 20,
      }}
      onClick={() => browserHistory.push('/distributors')}
    />
    <Separator size="sm" />
    <DistributorFormContainer />
    {props.distributorId && (
      <Block marginTop={20}>
        <DistributorManagerScene distributorId={props.distributorId} />
      </Block>
    )}
  </div>
);

DistributorFormScene.propTypes = {
  distributorId: PropTypes.string,
};

DistributorFormScene.defaultProps = {
  distributorId: null,
};

export default DistributorFormScene;
