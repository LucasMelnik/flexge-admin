import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';

injectTapEventPlugin();

const App = () => (
  <Routes />
);

window.__myapp_container = document.getElementById('root')
ReactDOM.render(<App />, window.__myapp_container)
