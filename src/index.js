import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import Routes from './Routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'antd/dist/antd.min.css';
import enUS from 'antd/lib/locale-provider/en_US';
import './index.css';

injectTapEventPlugin();

const App = () => (
  <LocaleProvider locale={enUS}>
    <Routes />
  </LocaleProvider>
);

window.__myapp_container = document.getElementById('root');
ReactDOM.render(<App />, window.__myapp_container);
