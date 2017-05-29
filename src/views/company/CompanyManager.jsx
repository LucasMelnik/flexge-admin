import React from 'react';
import Paper from '../../core/layout/Paper';
import SubTitle from '../../core/content/SubTitle';
import CompanyManagerList from './CompanyManagerList';
import CompanyManagerForm from './CompanyManagerForm';

const CompanyManager = () => (
  <div>
    <SubTitle>Company Managers</SubTitle>
    <Paper>
      <CompanyManagerForm />
      <CompanyManagerList />
    </Paper>
  </div>
);

export default CompanyManager;
