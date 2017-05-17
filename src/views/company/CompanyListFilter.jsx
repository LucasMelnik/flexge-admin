import React from 'react';
import Card from '../../core/layout/Card';
import TextInput from '../../core/form/TextInput';

const CompanyListFilter = () => (
  <Card
    flexible
    style={{
      padding: '0 20px 10px',
    }}
  >
    <TextInput
      label="Search companies"
    />
  </Card>
);

export default CompanyListFilter;
