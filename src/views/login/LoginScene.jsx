import React from 'react';
import Flex from 'jsxstyle/Flex';
import LoginFormContainer from './LoginFormContainer';

const LoginScene = () => (
  <Flex
    alignItems="center"
    justifyContent="center"
    height="100%"
    width="100%"
  >
    <LoginFormContainer />
  </Flex>
);

export default LoginScene;
