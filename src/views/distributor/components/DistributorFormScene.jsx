import React from 'react';
import PropTypes from 'prop-types';
import Block from 'jsxstyle/Block';
import Title from '../../../core/content/Title';
import DistributorFormContainer from './DistributorFormContainer';
import DistributorManagerScene from '../../distributor-manager/components/DistributorManagerScene';

const DistributorFormScene = props => (
  <div>
    <Title>
      Distributor
    </Title>
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
