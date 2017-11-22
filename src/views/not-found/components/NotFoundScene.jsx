import React from 'react';
import { Link } from 'react-router';
import { Layout } from 'antd';
import Separator from '../../../core/layout/Separator';

const NotFoundScene = () => (
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
          <h1>404</h1>
          <h3>Oops! Page not found!</h3>
          <Separator size="lg" />
          <Separator size="lg" />
          <Link to="/">
            Back to Home
          </Link>
        </div>
      </div>
    </Layout.Content>
  </Layout>
);

export default NotFoundScene;
