import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import LoginScene from './views/login/components/LoginScene';
import MainScene from './views/main/components/MainScene';
import DashboardScene from './views/dashboard/DashboardScene';
import CompanyListScene from './views/company/components/CompanyListScene';
import CompanyFormSceneContainer from './views/company/components/CompanyFormSceneContainer';
import SchoolListScene from './views/school/SchoolListScene';
import SchoolFormScene from './views/school/SchoolFormScene';
import StudentListScene from './views/student/components/StudentListScene';
import StudentFormSceneContainer from './views/student/components/StudentFormSceneContainer';
import NotFoundScene from './views/not-found/NotFoundScene';

function authRequired(nextState, replace) {
  if (!localStorage.accessToken) {
    replace('/login');
  }
}

const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/login" component={LoginScene} />
    <Route path="/" component={MainScene} onEnter={authRequired}>
      <IndexRoute component={DashboardScene} />
      <Route path="/companies" component={CompanyListScene} />
      <Route path="/companies/new" component={CompanyFormSceneContainer} />
      <Route path="/companies/:companyId" component={CompanyFormSceneContainer} />
      <Route path="/schools" component={SchoolListScene} />
      <Route path="/schools/new" component={SchoolFormScene} />
      <Route path="/students" component={StudentListScene} />
      <Route path="/students/new" component={StudentFormSceneContainer} />
      <Route path="/students/:studentId" component={StudentFormSceneContainer} />
    </Route>
    <Route path="*" component={NotFoundScene} />
  </Router>
);

export default Routes;
