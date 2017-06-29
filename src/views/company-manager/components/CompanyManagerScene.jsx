import React from 'react';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock';
import Paper from '../../../core/layout/Paper';
import SubTitle from '../../../core/content/SubTitle';
import FloatActionButton from '../../../core/form/FloatActionButton';
import CompanyManagerListContainer from './CompanyManagerListContainer';
import CompanyManagerFormContainer from './CompanyManagerFormContainer';

const CompanyManagerScene = props => (
  <div>
    <InlineBlock>
      <SubTitle>Company Managers</SubTitle>
    </InlineBlock>
    {props.actualScene === 'LIST' && (
      <FloatActionButton
        secondary
        icon="add"
        style={{
          position: 'relative',
          float: 'right',
          top: 20,
          right: 20,
        }}
        onClick={() => props.changeToForm()}
      />
    )}
    {props.actualScene === 'FORM' && (
      <FloatActionButton
        secondary
        icon="arrow_back"
        style={{
          position: 'relative',
          float: 'right',
          top: 20,
          right: 20,
        }}
        onClick={() => props.changeToList()}
      />
    )}
    <Paper>
      {props.actualScene === 'LIST' && (
        <CompanyManagerListContainer
          onRowClick={props.onRowClick}
        />
      )}
      {props.actualScene === 'FORM' && (
        <CompanyManagerFormContainer />
      )}
    </Paper>
  </div>
);

CompanyManagerScene.propTypes = {
  actualScene: PropTypes.string.isRequired,
  changeToList: PropTypes.func.isRequired,
  changeToForm: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
};

export default CompanyManagerScene;
