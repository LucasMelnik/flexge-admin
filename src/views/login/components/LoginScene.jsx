import React from 'react';
import Flex from 'jsxstyle/Flex';
import LoginFormContainer from './LoginFormContainer';
import NotificationContainer from '../../main/components/NotificationContainer';

const LoginScene = () => (
  <div>
    <Flex
      alignItems="center"
      justifyContent="center"
      height="100%"
      width="100%"
    >
      <LoginFormContainer />
    </Flex>
    <NotificationContainer />
  </div>
);

export default LoginScene;
