import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import LoginScene from './views/login/LoginScene';
import MainScene from './views/main/MainScene';
import DashboardScene from './views/dashboard/DashboardScene';
import CompanyListScene from './views/company/CompanyListScene';
import CompanyFormScene from './views/company/CompanyFormScene';
import SchoolListScene from './views/school/SchoolListScene';
import SchoolFormScene from './views/school/SchoolFormScene';
import StudentListScene from './views/student/StudentListScene';
import StudentFormScene from './views/student/StudentFormScene';
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
      <Route path="/companies" component={CompanyListScene} />
      <Route path="/companies/new" component={CompanyFormScene} />
      <Route path="/schools" component={SchoolListScene} />
      <Route path="/schools/new" component={SchoolFormScene} />
      <Route path="/students" component={StudentListScene} />
      <Route path="/students/new" component={StudentFormScene} />
    </Route>
    <Route path="*" component={NotFoundScene} />
  </Router>
);

export default Routes;
