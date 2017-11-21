import React from 'react';
import { Layout } from 'antd';
import LoginFormContainer from './LoginFormContainer';

const LoginScene = () => (
  <Layout>
    <Layout.Content
      style={{
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: '100%',
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            width: 400,
            borderRadius: 3,
            padding: 20,
            boxShadow: '0 2px 24px 0 rgba(0,0,0,.33)',
          }}
        >
          <LoginFormContainer />
        </div>
      </div>
    </Layout.Content>
  </Layout>
);

export default LoginScene;
