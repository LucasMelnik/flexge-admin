import React from 'react';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock';
import Paper from '../../../core/layout/Paper';
import FloatActionButton from '../../../core/form/FloatActionButton';
import SchoolManagerListContainer from './SchoolManagerListContainer';
import SchoolManagerFormContainer from './SchoolManagerFormContainer';
import SchoolManagerListPaginationContainer from './SchoolManagerListPaginationContainer';

const SchoolManagerScene = props => (
  <Paper>
    <FloatActionButton
      secondary
      icon={props.actualScene === 'LIST' ? 'add' : 'arrow_back'}
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
        <SchoolManagerListContainer
          onRowClick={props.changeToEdit}
        />
        <InlineBlock
          width="100%"
          textAlign="center"
        >
          <SchoolManagerListPaginationContainer />
        </InlineBlock>
      </div>
    )}
    {props.actualScene === 'FORM' && (
      <SchoolManagerFormContainer />
    )}
  </Paper>
);

SchoolManagerScene.propTypes = {
  actualScene: PropTypes.string.isRequired,
  changeToList: PropTypes.func.isRequired,
  changeToNew: PropTypes.func.isRequired,
  changeToEdit: PropTypes.func.isRequired,
};

export default SchoolManagerScene;
