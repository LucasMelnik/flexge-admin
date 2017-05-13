import React from 'react';
import {Router, Route, browserHistory} from 'react-router';
import App from './App';
import LoginScene from './components/login/LoginScene';

const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
    <Route path="/login" component={LoginScene}/>
  </Router>
);

export default Routes;
