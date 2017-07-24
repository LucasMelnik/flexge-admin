import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import LoginScene from './views/login/components/LoginScene';
import MainScene from './views/main/components/MainScene';
import DashboardScene from './views/dashboard/components/DashboardScene';
import CompanyListScene from './views/company/components/CompanyListScene';
import CompanyFormSceneContainer from './views/company/components/CompanyFormSceneContainer';
import DistributorListScene from './views/distributor/components/DistributorListScene';
import DistributorFormSceneContainer from './views/distributor/components/DistributorFormSceneContainer';
import SchoolListScene from './views/school/components/SchoolListScene';
import SchoolFormSceneContainer from './views/school/components/SchoolFormSceneContainer';
import StudentListScene from './views/student/components/StudentListScene';
import StudentFormSceneContainer from './views/student/components/StudentFormSceneContainer';
import TeacherListScene from './views/teacher/components/TeacherListScene';
import TeacherFormSceneContainer from './views/teacher/components/TeacherFormSceneContainer';
import ModuleListScene from './views/module/components/ModuleListScene';
import ModuleFormSceneContainer from './views/module/components/ModuleFormSceneContainer';
import ModuleUnitsSceneContainer from './views/module/components/ModuleUnitsSceneContainer';
import UnitFormSceneContainer from './views/module/components/unit/UnitFormSceneContainer';
import UnitItemListSceneContainer from './views/module/components/unit/unit-item/UnitItemListSceneContainer';
import ItemFormSceneContainer from './views/module/components/unit/unit-item/ItemFormSceneContainer';
import ReviewListSceneContainer from './views/unit-review/components/ReviewListSceneContainer';
import ReviewFormSceneContainer from './views/unit-review/components/ReviewFormSceneContainer';
import MasteryTestFormSceneContainer from './views/mastery-test/components/MasteryTestFormSceneContainer';
import PlacementTestListScene from './views/placement-test/components/PlacementTestListScene';
import PlacementTestFormSceneContainer from './views/placement-test/components/PlacementTestFormSceneContainer';
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
      <Route path="/distributors" component={DistributorListScene} />
      <Route path="/distributors/new" component={DistributorFormSceneContainer} />
      <Route path="/distributors/:distributorId" component={DistributorFormSceneContainer} />
      <Route path="/schools" component={SchoolListScene} />
      <Route path="/schools/new" component={SchoolFormSceneContainer} />
      <Route path="/schools/:schoolId" component={SchoolFormSceneContainer} />
      <Route path="/students" component={StudentListScene} />
      <Route path="/students/new" component={StudentFormSceneContainer} />
      <Route path="/students/:studentId" component={StudentFormSceneContainer} />
      <Route path="/teachers" component={TeacherListScene} />
      <Route path="/teachers/new" component={TeacherFormSceneContainer} />
      <Route path="/teachers/:teacherId" component={TeacherFormSceneContainer} />
      <Route path="/modules" component={ModuleListScene} />
      <Route path="/modules/new" component={ModuleFormSceneContainer} />
      <Route path="/modules/:moduleId" component={ModuleFormSceneContainer} />
      <Route path="/modules/:moduleId/units" component={ModuleUnitsSceneContainer} />
      <Route path="/modules/:moduleId/units/new" component={UnitFormSceneContainer} />
      <Route path="/modules/:moduleId/units/:unitId" component={UnitFormSceneContainer} />
      <Route path="/modules/:moduleId/units/:unitId/items" component={UnitItemListSceneContainer} />
      <Route path="/modules/:moduleId/units/:unitId/items/new" component={ItemFormSceneContainer} />
      <Route path="/modules/:moduleId/units/:unitId/reviews/:reviewId" component={ReviewFormSceneContainer} />
      <Route path="/modules/:moduleId/units/:unitId/reviews/:reviewId/items/:itemId" component={ItemFormSceneContainer} />
      <Route path="/modules/:moduleId/units/:unitId/items/:itemId" component={ItemFormSceneContainer} />
      <Route path="/reviews" component={ReviewListSceneContainer} />
      <Route path="/modules/:moduleId/mastery-tests/new" component={MasteryTestFormSceneContainer} />
      <Route path="/modules/:moduleId/mastery-tests/:masteryTestId" component={MasteryTestFormSceneContainer} />
      <Route path="/placement-tests" component={PlacementTestListScene} />
      <Route path="/placement-tests/new" component={PlacementTestFormSceneContainer} />
      <Route path="/placement-tests/:placementTestId" component={PlacementTestFormSceneContainer} />
    </Route>
    <Route path="*" component={NotFoundScene} />
  </Router>
);

export default Routes;
