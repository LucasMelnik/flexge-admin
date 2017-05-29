import React from 'react';
import PropTypes from 'prop-types';
import Block from 'jsxstyle/Block';
import Title from '../../../core/content/Title';
import CompanyFormContainer from './CompanyFormContainer';
import CompanyManagerScene from '../../company-manager/CompanyManagerScene';

const CompanyFormScene = props => (
  <div>
    <Title>
      Company
    </Title>
    <CompanyFormContainer />
    {props.companyId && (
      <Block marginTop={20}>
        <CompanyManagerScene />
      </Block>
    )}
  </div>
);

CompanyFormScene.propTypes = {
  companyId: PropTypes.string,
};

CompanyFormScene.defaultProps = {
  companyId: null,
};

export default CompanyFormScene;
