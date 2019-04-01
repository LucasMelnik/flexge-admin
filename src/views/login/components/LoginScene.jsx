import React from 'react';
import { Layout } from 'antd';
import BgLogin from '../../../core/images/bg-login.png';
import WhitelabelContext from '../../../core/WhitelabelContext';
import LoginFormContainer from './LoginFormContainer';
import Separator from '../../../core/layout/Separator';

const LoginScene = () => (
  <WhitelabelContext.Consumer>
    {({ primaryColor, logoUrl }) => (
      <Layout>
        <Layout.Content
          style={{
            minHeight: '100vh',
            backgroundColor: primaryColor,
          }}
        >
          <img
            src={BgLogin}
            alt="bg"
            style={{
              position: 'fixed',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'relative',
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
                minWidth: 400,
                borderRadius: 3,
                padding: 40,
                boxShadow: '0 2px 24px 0 rgba(0,0,0,.33)',
              }}
            >
              <img
                src={logoUrl}
                alt="logo"
                style={{
                  display: 'flex',
                  margin: '0 auto',
                  width: 280,
                  height: 'auto',
                  objectFit: 'scale-down',
                }}
              />
              <Separator size="lg" />
              <LoginFormContainer />
            </div>
          </div>
        </Layout.Content>
      </Layout>
    )}
  </WhitelabelContext.Consumer>
);

export default LoginScene;
