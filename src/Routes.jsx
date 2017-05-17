import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import MainScene from './views/main/MainScene';
import DashboardScene from './views/dashboard/DashboardScene';
import LoginScene from './views/login/LoginScene';
import NotFoundScene from './views/not-found/NotFoundScene';


function authRequired(nextState, replace) {
  if (!localStorage.token) {
    replace('/login');
  }
}

const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/login" component={LoginScene} />
    <Route path="/" component={MainScene} onEnter={authRequired}>
      <IndexRoute component={DashboardScene} />
    </Route>
    <Route path="*" component={NotFoundScene} />
  </Router>
);

export default Routes;
