import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import LoginScene from './views/login/components/LoginScene';
import MainScene from './views/main/components/MainScene';
import DashboardScene from './views/dashboard/components/DashboardScene';

import CompanyListScene from './views/company/components/CompanyListScene';
import CompanyFormScene from './views/company/components/CompanyFormScene';
import CompanyDetailSceneContainer from './views/company/components/CompanyDetailSceneContainer';

import DistributorListScene from './views/distributor/components/DistributorListScene';
import DistributorFormScene from './views/distributor/components/DistributorFormScene';
import DistributorDetailSceneContainer from './views/distributor/components/DistributorDetailSceneContainer';

import TeacherListScene from './views/teacher/components/TeacherListScene';
import TeacherFormScene from './views/teacher/components/TeacherFormScene';

import SchoolListScene from './views/school/components/SchoolListScene';
import SchoolFormScene from './views/school/components/SchoolFormScene';
import SchoolFormSceneContainer from './views/school/components/SchoolFormSceneContainer';
import SchoolDetailSceneContainer from './views/school/components/SchoolDetailSceneContainer';

import ModuleListScene from './views/module/components/ModuleListScene';
import ModuleFormScene from './views/module/components/ModuleFormScene';
import ModuleDetailSceneContainer from './views/module/components/ModuleDetailSceneContainer';
import MasteryTestFormSceneContainer from './views/mastery-test/components/MasteryTestFormSceneContainer';
import UnitFormSceneContainer from './views/module/components/unit/UnitFormSceneContainer';
import UnitItemListSceneContainer from './views/module/components/unit/unit-item/UnitItemListSceneContainer';
import UnitItemFormSceneContainer from './views/module/components/unit/unit-item/UnitItemFormSceneContainer';
import UnitReviewItemListSceneContainer from './views/module/components/unit/unit-item/UnitReviewItemListSceneContainer';

import ReviewListSceneContainer from './views/unit-review/components/ReviewListSceneContainer';
import ReviewFormSceneContainer from './views/unit-review/components/ReviewFormSceneContainer';

import StudentListScene from './views/student/components/StudentListScene';
import StudentFormSceneContainer from './views/student/components/StudentFormSceneContainer';

import SchoolClassListScene from './views/school-class/components/SchoolClassListScene';
import SchoolClassFormScene from './views/school-class/components/SchoolClassFormScene';
import SchoolClassDetailSceneContainer from './views/school-class/components/SchoolClassDetailSceneContainer';

import PlacementTestListScene from './views/placement-test/components/PlacementTestListScene';
import PlacementTestFormScene from './views/placement-test/components/PlacementTestFormScene';

import UserListSceneContainer from './views/user/components/UserListSceneContainer';
import UserFormScene from './views/user/components/UserFormScene';
import UserAdminListScene from './views/user/components/UserAdminListScene';
import UserAdminFormScene from './views/user/components/UserAdminFormScene';
import UserDistributorListSceneContainer from './views/user/components/UserDistributorListSceneContainer';
import UserDistributorFormScene from './views/user/components/UserDistributorFormScene';

import NotFoundScene from './views/not-found/components/NotFoundScene';

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
      <Route path="companies" component={CompanyListScene} />
      <Route path="companies/new" component={CompanyFormScene} />
      <Route path="companies/:companyId" component={CompanyFormScene} />
      <Route path="company-detail/:companyId" component={CompanyDetailSceneContainer} />
      <Route path="distributor-detail/:distributorId/company-detail/:companyId" component={CompanyDetailSceneContainer} />
      <Route path="distributors" component={DistributorListScene} />
      <Route path="distributors/new" component={DistributorFormScene} />
      <Route path="distributors/:distributorId" component={DistributorFormScene} />
      <Route path="distributor-detail/:distributorId" component={DistributorDetailSceneContainer} />
      <Route path="teachers" component={TeacherListScene} />
      <Route path="teachers/new" component={TeacherFormScene} />
      <Route path="teachers/:teacherId" component={TeacherFormScene} />
      <Route path="schools" component={SchoolListScene} />
      <Route path="schools/new" component={SchoolFormScene} />
      <Route path="schools/:schoolId" component={SchoolFormSceneContainer} />
      <Route path="companies/:companyId/schools/new" component={SchoolFormSceneContainer} />
      <Route path="companies/:companyId/schools/:schoolId" component={SchoolFormSceneContainer} />
      <Route path="distributors/:distributorId/companies/:companyId/schools/new" component={SchoolFormSceneContainer} />
      <Route path="distributors/:distributorId/companies/:companyId/schools/:schoolId" component={SchoolFormSceneContainer} />
      <Route path="school-detail/:schoolId" component={SchoolDetailSceneContainer} />
      <Route path="company-detail/:companyId/school-detail/:schoolId" component={SchoolDetailSceneContainer} />
      <Route path="distributor-detail/:distributorId/company-detail/:companyId/school-detail/:schoolId" component={SchoolDetailSceneContainer} />
      <Route path="company-detail/:companyId/school-detail/:schoolId" component={SchoolDetailSceneContainer} />
      <Route path="classes" component={SchoolClassListScene} />
      <Route path="classes/new" component={SchoolClassFormScene} />
      <Route path="classes/:classId" component={SchoolClassFormScene} />
      <Route path="companies/:companyId/schools/:schoolId/classes/new" component={SchoolClassFormScene} />
      <Route path="companies/:companyId/schools/:schoolId/classes/:classId" component={SchoolClassFormScene} />
      <Route path="distributor-detail/:distributorId/company-detail/:companyId/school-detail/:schoolId/class-detail/:classId" component={SchoolClassDetailSceneContainer} />
      <Route path="company-detail/:companyId/school-detail/:schoolId/class-detail/:classId" component={SchoolClassDetailSceneContainer} />
      <Route path="school-detail/:schoolId/class-detail/:classId" component={SchoolClassDetailSceneContainer} />
      <Route path="class-detail/:classId" component={SchoolClassDetailSceneContainer} />
      <Route path="modules" component={ModuleListScene} />
      <Route path="modules/new" component={ModuleFormScene} />
      <Route path="modules/:moduleId" component={ModuleFormScene} />
      <Route path="modules/:moduleId/details" component={ModuleDetailSceneContainer} />
      <Route path="modules/:moduleId/mastery-tests/new" component={MasteryTestFormSceneContainer} />
      <Route path="modules/:moduleId/mastery-tests/:masteryTestId" component={MasteryTestFormSceneContainer} />
      <Route path="modules/:moduleId/units/new" component={UnitFormSceneContainer} />
      <Route path="modules/:moduleId/units/:unitId" component={UnitFormSceneContainer} />
      <Route path="modules/:moduleId/units/:unitId/items" component={UnitItemListSceneContainer} />
      <Route path="modules/:moduleId/units/:unitId/items/new" component={UnitItemFormSceneContainer} />
      <Route path="modules/:moduleId/units/:unitId/review-items" component={UnitReviewItemListSceneContainer} />
      <Route path="students" component={StudentListScene} />
      <Route path="students/new" component={StudentFormSceneContainer} />
      <Route path="students/:studentId" component={StudentFormSceneContainer} />
      <Route path="distributor-detail/:distributorId/company-detail/:companyId/school-detail/:schoolId/class-detail/:classId/students/new" component={StudentFormSceneContainer} />
      <Route path="distributor-detail/:distributorId/company-detail/:companyId/school-detail/:schoolId/class-detail/:classId/students/:studentId" component={StudentFormSceneContainer} />
      <Route path="company-detail/:companyId/school-detail/:schoolId/class-detail/:classId/students/new" component={StudentFormSceneContainer} />
      <Route path="company-detail/:companyId/school-detail/:schoolId/class-detail/:classId/students/:studentId" component={StudentFormSceneContainer} />
      <Route path="school-detail/:schoolId/class-detail/:classId/students/new" component={StudentFormSceneContainer} />
      <Route path="school-detail/:schoolId/class-detail/:classId/students/:studentId" component={StudentFormSceneContainer} />
      <Route path="placement-test" component={PlacementTestListScene} />
      <Route path="placement-test/new" component={PlacementTestFormScene} />
      <Route path="placement-test/:placementTestId" component={PlacementTestFormScene} />
      <Route path="reviews" component={ReviewListSceneContainer} />
      <Route path="modules/:moduleId/units/:unitId/reviews/:reviewId" component={ReviewFormSceneContainer} />
      <Route path="users" component={UserListSceneContainer} />
      <Route path="admin-users" component={UserAdminListScene} />
      <Route path="distributor-users" component={UserDistributorListSceneContainer} />
      <Route path="companies/:companyId/users/new" component={UserFormScene} />
      <Route path="companies/:companyId/users/:userId" component={UserFormScene} />
      <Route path="companies/:companyId/admin-users/new" component={UserAdminFormScene} />
      <Route path="companies/:companyId/admin-users/:userId" component={UserAdminFormScene} />
      <Route path="companies/:companyId/distributor-users/new" component={UserDistributorFormScene} />
      <Route path="companies/:companyId/distributor-users/:userId" component={UserDistributorFormScene} />
      <Route path="*" component={NotFoundScene} />
    </Route>
    <Route path="*" component={NotFoundScene} />
  </Router>
);

export default Routes;
