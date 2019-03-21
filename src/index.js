import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import Routes from './Routes';
import 'antd/dist/antd.min.css';
import enUS from 'antd/lib/locale-provider/en_US';
import WhitelabelContainer from './core/WhitelabelContainer';
import './index.css';

const App = () => (
  <LocaleProvider locale={enUS}>
    <WhitelabelContainer>
      <Routes />
    </WhitelabelContainer>
  </LocaleProvider>
);

window.__myapp_container = document.getElementById('root');
ReactDOM.render(<App />, window.__myapp_container);
