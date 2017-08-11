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
import MasteryTestFormScene from './views/mastery-test/components/MasteryTestFormScene';
import PlacementTestListScene from './views/placement-test/components/PlacementTestListScene';
import PlacementTestFormSceneContainer from './views/placement-test/components/PlacementTestFormSceneContainer';
import NotFoundScene from './views/not-found/NotFoundScene';


// **** V2 **** //
import LoginSceneV2 from './v2/views/login/components/LoginScene';
import MainSceneV2 from './v2/views/main/components/MainScene';
import TestComponents from './v2/TestComponents';
import DashboardSceneV2 from './v2/views/dashboard/components/DashboardScene';

import CompanyListSceneV2 from './v2/views/company/components/CompanyListScene';
import CompanyFormScene from './v2/views/company/components/CompanyFormScene';

import DistributorListSceneV2 from './v2/views/distributor/components/DistributorListScene';
import DistributorFormScene from './v2/views/distributor/components/DistributorFormScene';

import TeacherListSceneV2 from './v2/views/teacher/components/TeacherListScene';
import TeacherFormScene from './v2/views/teacher/components/TeacherFormScene';

import SchoolListSceneV2 from './v2/views/school/components/SchoolListScene';
import SchoolFormScene from './v2/views/school/components/SchoolFormScene';

import ModuleListSceneV2 from './v2/views/module/components/ModuleListScene';
import ModuleFormSceneV2 from './v2/views/module/components/ModuleFormScene';
import ModuleDetailSceneContainerV2 from './v2/views/module/components/ModuleDetailSceneContainer';
import MasteryTestFormSceneContainerV2 from './v2/views/mastery-test/components/MasteryTestFormSceneContainer';
import UnitFormSceneContainerV2 from './v2/views/module/components/unit/UnitFormSceneContainer';
import UnitItemListSceneContainerV2 from './v2/views/module/components/unit/unit-item/UnitItemListSceneContainer';
import UnitItemFormSceneContainerV2 from './v2/views/module/components/unit/unit-item/UnitItemFormSceneContainer';
import UnitReviewItemListSceneContainerV2 from './v2/views/module/components/unit/unit-item/UnitReviewItemListSceneContainer';

import StudentListSceneV2 from './v2/views/student/components/StudentListScene';
import StudentFormScene from './v2/views/student/components/StudentFormScene';
//
// import SchoolClassListSceneV2 from './v2/views/school-class/components/SchoolClassListScene';
// import SchoolClassFormScene from './v2/views/school-class/components/SchoolClassFormScene';

import PlacementTestListSceneV2 from './v2/views/placement-test/components/PlacementTestListScene';
import PlacementTestFormSceneV2 from './v2/views/placement-test/components/PlacementTestFormScene';

function authRequired(nextState, replace) {
  if (!localStorage.accessToken) {
    replace('/login');
  }
}

const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/login" component={LoginSceneV2} />
    <Route path="/v2/" component={MainSceneV2} onEnter={authRequired}>
      <IndexRoute component={DashboardSceneV2} />
      <Route path="companies" component={CompanyListSceneV2} />
      <Route path="companies/new" component={CompanyFormScene} />
      <Route path="companies/:companyId" component={CompanyFormScene} />
      <Route path="distributors" component={DistributorListSceneV2} />
      <Route path="distributors/new" component={DistributorFormScene} />
      <Route path="distributors/:distributorId" component={DistributorFormScene} />
      <Route path="teachers" component={TeacherListSceneV2} />
      <Route path="teachers/new" component={TeacherFormScene} />
      <Route path="teachers/:teacherId" component={TeacherFormScene} />
      <Route path="schools" component={SchoolListSceneV2} />
      <Route path="schools/new" component={SchoolFormScene} />
      <Route path="schools/:schoolId" component={SchoolFormScene} />
      <Route path="modules" component={ModuleListSceneV2} />
      <Route path="modules/new" component={ModuleFormSceneV2} />
      <Route path="modules/:moduleId" component={ModuleFormSceneV2} />
      <Route path="modules/:moduleId/details" component={ModuleDetailSceneContainerV2} />
      <Route path="modules/:moduleId/mastery-tests/new" component={MasteryTestFormSceneContainerV2} />
      <Route path="modules/:moduleId/mastery-tests/:masteryTestId" component={MasteryTestFormSceneContainerV2} />
      <Route path="modules/:moduleId/units/new" component={UnitFormSceneContainerV2} />
      <Route path="modules/:moduleId/units/:unitId" component={UnitFormSceneContainerV2} />
      <Route path="modules/:moduleId/units/:unitId/items" component={UnitItemListSceneContainerV2} />
      <Route path="modules/:moduleId/units/:unitId/items/new" component={UnitItemFormSceneContainerV2} />
      <Route path="modules/:moduleId/units/:unitId/review-items" component={UnitReviewItemListSceneContainerV2} />
      <Route path="students" component={StudentListSceneV2} />
      <Route path="students/new" component={StudentFormScene} />
      <Route path="students/:studentId" component={StudentFormScene} />
      <Route path="placement-test" component={PlacementTestListSceneV2} />
      <Route path="placement-test/new" component={PlacementTestFormSceneV2} />
      <Route path="placement-test/:placementTestId" component={PlacementTestFormSceneV2} />
    </Route>
    <Route path="/v2/test" component={TestComponents} />
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
      <Route path="/reviews" component={ReviewListSceneContainer} />
      <Route path="/modules/:moduleId/mastery-tests/new" component={MasteryTestFormScene} />
      <Route path="/modules/:moduleId/mastery-tests/:masteryTestId" component={MasteryTestFormScene} />
      <Route path="/placement-test" component={PlacementTestListScene} />
      <Route path="/placement-test/new" component={PlacementTestFormSceneContainer} />
      <Route path="/placement-test/:placementTestId" component={PlacementTestFormSceneContainer} />
    </Route>
    <Route path="*" component={NotFoundScene} />
  </Router>
);

export default Routes;
