import React from 'react';
import Block from 'jsxstyle/Block';
import Title from '../../core/content/Title';
import CompanyForm from './CompanyForm';
import CompanyManagerScene from '../company-manager/CompanyManagerScene';

const CompanyFormScene = () => (
  <div>
    <Title>
      Create company
    </Title>
    <CompanyForm />
    <Block marginTop={20}>
      <CompanyManagerScene />
    </Block>
  </div>
);

export default CompanyFormScene;
