import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Theme from './core/layout/Theme';
import Unit from './views/unit/components/UnitListScene'
import './index.css';

injectTapEventPlugin();

ReactDOM.render(
  <Theme>
    <Routes />
    {/* <Unit /> */}
  </Theme>,
  document.getElementById('root')
);
