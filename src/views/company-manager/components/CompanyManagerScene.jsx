import React from 'react';
import PropTypes from 'prop-types';
import InlineBlock from 'jsxstyle/InlineBlock';
import Paper from '../../../core/layout/Paper';
import SubTitle from '../../../core/content/SubTitle';
import CompanyManagerListContainer from './CompanyManagerListContainer';
import CompanyManagerFormContainer from './CompanyManagerFormContainer';
import CompanyManagerListPaginationContainer from './CompanyManagerListPaginationContainer';

const CompanyManagerScene = props => (
  <div>
    <SubTitle>Company Managers</SubTitle>
    <Paper>
      <CompanyManagerFormContainer companyId={props.companyId} />
      <CompanyManagerListContainer companyId={props.companyId} />
      <InlineBlock
        width="100%"
        textAlign="center"
      >
        <CompanyManagerListPaginationContainer />
      </InlineBlock>
    </Paper>
  </div>
);

CompanyManagerScene.propTypes = {
  companyId: PropTypes.string.isRequired,
};

export default CompanyManagerScene;
