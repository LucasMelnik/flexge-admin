import React from 'react';
import Card from '../../core/layout/Card';
import TextInput from '../../core/form/TextInput';

const StudentListFilter = () => (
  <Card
    flexible
    style={{
      padding: '0 20px 10px',
    }}
  >
    <TextInput
      label="Search students"
    />
  </Card>
);

export default StudentListFilter;
