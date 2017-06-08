import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Theme from './core/layout/Theme';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import ModuleList from './views/module/components/ModuleList'
import ModuleFormScene from './views/module/components/ModuleFormScene'

injectTapEventPlugin();

ReactDOM.render(
  <Theme>
    <Routes />
  </Theme>,
  document.getElementById('root')
);
