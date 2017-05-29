import React from 'react';
import Block from 'jsxstyle/Block';
import Title from '../../core/content/Title';
import SchoolForm from './SchoolForm';
import SchoolClassScene from '../school-class/SchoolClassScene';

const SchoolFormScene = () => (
  <div>
    <Title>
      Create School
    </Title>
    <SchoolForm />
    <Block marginTop={20}>
      <SchoolClassScene />
    </Block>
  </div>
);

export default SchoolFormScene;
