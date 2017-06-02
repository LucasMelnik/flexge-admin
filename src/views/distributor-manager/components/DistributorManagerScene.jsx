import React from 'react';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock';
import Paper from '../../../core/layout/Paper';
import SubTitle from '../../../core/content/SubTitle';
import DistributorManagerListContainer from './DistributorManagerListContainer';
import DistributorManagerFormContainer from './DistributorManagerFormContainer';
import DistributorManagerListPaginationContainer from './DistributorManagerListPaginationContainer';

const DistributorManagerScene = props => (
  <div>
    <SubTitle>Distributor Managers</SubTitle>
    <Paper>
      <DistributorManagerFormContainer distributorId={props.distributorId} />
      <DistributorManagerListContainer distributorId={props.distributorId} />
      <InlineBlock
        width="100%"
        textAlign="center"
      >
        <DistributorManagerListPaginationContainer />
      </InlineBlock>
    </Paper>
  </div>
);

DistributorManagerScene.propTypes = {
  distributorId: PropTypes.string.isRequired,
};

export default DistributorManagerScene;
