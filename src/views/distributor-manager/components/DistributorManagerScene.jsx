import React from 'react';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock';
import Paper from '../../../core/layout/Paper';
import SubTitle from '../../../core/content/SubTitle';
import FloatActionButton from '../../../core/form/FloatActionButton';
import DistributorManagerListContainer from './DistributorManagerListContainer';
import DistributorManagerFormContainer from './DistributorManagerFormContainer';
import DistributorManagerListPaginationContainer from './DistributorManagerListPaginationContainer';

const DistributorManagerScene = props => (
  <div>
    <InlineBlock>
      <SubTitle>Managers</SubTitle>
    </InlineBlock>
    <FloatActionButton
      secondary
      icon={props.actualScene === 'LIST' ? 'add' : 'arrow_back'}
      style={{
        position: 'relative',
        float: 'right',
        top: 10,
        right: 20,
      }}
      onClick={() => {
        if (props.actualScene === 'FORM') {
          props.changeToList();
        }
        if (props.actualScene === 'LIST') {
          props.changeToNew();
        }
      }}
    />
    <Paper>
      {props.actualScene === 'LIST' && (
        <div>
          <DistributorManagerListContainer
            onRowClick={props.changeToEdit}
          />
          <InlineBlock
            width="100%"
            textAlign="center"
          >
            <DistributorManagerListPaginationContainer />
          </InlineBlock>
        </div>
      )}
      {props.actualScene === 'FORM' && (
        <DistributorManagerFormContainer distributorId={props.distributorId} />
      )}
    </Paper>
  </div>
);

DistributorManagerScene.propTypes = {
  actualScene: PropTypes.string.isRequired,
  changeToList: PropTypes.func.isRequired,
  changeToNew: PropTypes.func.isRequired,
  changeToEdit: PropTypes.func.isRequired,
};

export default DistributorManagerScene;
