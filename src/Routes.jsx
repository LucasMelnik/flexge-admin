import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import LoginScene from './views/login/LoginScene';
import MainScene from './views/main/MainScene';
import DashboardScene from './views/dashboard/DashboardScene';
import CompanyListScene from './views/company/CompanyListScene';
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
      <Route path="/company" component={CompanyListScene} />
    </Route>
    <Route path="*" component={NotFoundScene} />
  </Router>
);

export default Routes;
