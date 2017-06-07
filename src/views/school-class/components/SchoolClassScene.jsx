import React from 'react';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock';
import FloatActionButton from '../../../core/form/FloatActionButton';
import Paper from '../../../core/layout/Paper';
import SchoolClassListContainer from './SchoolClassListContainer';
import SchoolClassListPaginationContainer from './SchoolClassListPaginationContainer';
import SchoolClassFormContainer from './SchoolClassFormContainer';

const SchoolClassScene = props => (
  <Paper>
    <FloatActionButton
      secondary
      icon={props.actualScene === 'FORM' ? 'arrow_back' : 'add'}
      style={{
        position: 'absolute',
        float: 'right',
        top: -30,
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
    {props.actualScene === 'LIST' && (
      <div>
        <SchoolClassListContainer onSelect={props.changeToEdit} />
        <InlineBlock
          width="100%"
          textAlign="center"
        >
          <SchoolClassListPaginationContainer />
        </InlineBlock>
      </div>
    )}
    {props.actualScene === 'FORM' && (
      <SchoolClassFormContainer />
    )}
  </Paper>
);

SchoolClassScene.propTypes = {
  actualScene: PropTypes.string.isRequired,
  changeToList: PropTypes.func.isRequired,
  changeToNew: PropTypes.func.isRequired,
  changeToEdit: PropTypes.func.isRequired,
};

export default SchoolClassScene;
