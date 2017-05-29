import React from 'react';
import Flex from 'jsxstyle/Flex';
import Paper from '../../core/layout/Paper';

const NotFoundScene = () => (
  <Flex
    alignItems="center"
    justifyContent="center"
    height="100%"
  >
    <Paper style={{ height: 500, width: 500 }}>
      Page not found!
    </Paper>
  </Flex>
);

export default NotFoundScene;
