import React from 'react';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';

import LoginScene from './views/login/components/LoginScene';
import MainScene from './views/main/components/MainScene';
import DashboardScene from './views/dashboard/components/DashboardScene';

import CompanyListScene from './views/company/components/CompanyListScene';
import CompanyFormSceneContainer from './views/company/components/CompanyFormSceneContainer';
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
import SchoolClassFormSceneContainer from './views/school-class/components/SchoolClassFormSceneContainer';
import SchoolClassDetailSceneContainer from './views/school-class/components/SchoolClassDetailSceneContainer';

import PlacementTestListScene from './views/placement-test/components/PlacementTestListScene';
import PlacementTestFormScene from './views/placement-test/components/PlacementTestFormScene';

import UserListSceneContainer from './views/user/components/UserListSceneContainer';
import UserFormScene from './views/user/components/UserFormScene';
import UserAdminListScene from './views/user/components/UserAdminListScene';
import UserAdminFormScene from './views/user/components/UserAdminFormScene';
import UserDistributorListSceneContainer from './views/user/components/UserDistributorListSceneContainer';
import UserDistributorFormScene from './views/user/components/UserDistributorFormScene';

import PracticeTestFormScene from './views/practice-test/components/PracticeTestFormScene';

import NotFoundScene from './views/not-found/components/NotFoundScene';
import ConfigurationFormScene from './views/configuration/components/ConfigurationFormScene';
import ItemTypeListScene from './views/item-type/components/ItemTypeListScene';
import ItemTypeFormSceneContainer from './views/item-type/components/ItemTypeFormSceneContainer';
import CourseListScene from './views/course/components/CourseListScene';
import CourseFormSceneContainer from './views/course/components/CourseFormSceneContainer';
import PlacementTestLevelFormSceneContainer from './views/placement-test-level/components/PlacementTestLevelFormSceneContainer';
import PlacementTestLevelListScene from './views/placement-test-level/components/PlacementTestLevelListScene';
import PlacementTestItemsListScene from './views/placement-test-items/components/PlacementTestListScene';
import StudentTestListScene from './views/student-test/components/StudentTestListScene';
import StudentTestDetailsScene from './views/student-test/components/StudentTestDetailsScene';

import FilterRecordScene from './views/reports/components/FilterRecordScene';
import SchoolClassRecordScene from './views/reports/components/school-class/SchoolClassRecordScene';
import StudentRecordScene from './views/reports/components/student/StudentRecordScene';
import StudentDetailRecordScene from './views/reports/components/student-detail/StudentDetailRecordScene';

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
      <Route path="companies/new" component={CompanyFormSceneContainer} />
      <Route path="companies/:companyId" component={CompanyFormSceneContainer} />
      <Route path="distributors/:distributorId/companies/new" component={CompanyFormSceneContainer} />
      <Route path="distributors/:distributorId/companies/:companyId" component={CompanyFormSceneContainer} />
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
      <Route path="classes/new" component={SchoolClassFormSceneContainer} />
      <Route path="classes/:classId" component={SchoolClassFormSceneContainer} />
      <Route path="schools/:schoolId/classes/new" component={SchoolClassFormSceneContainer} />
      <Route path="schools/:schoolId/classes/:classId" component={SchoolClassFormSceneContainer} />
      <Route path="companies/:companyId/schools/:schoolId/classes/new" component={SchoolClassFormSceneContainer} />
      <Route path="companies/:companyId/schools/:schoolId/classes/:classId" component={SchoolClassFormSceneContainer} />
      <Route path="distributors/:distributorId/companies/:companyId/schools/:schoolId/classes/new" component={SchoolClassFormSceneContainer} />
      <Route path="distributors/:distributorId/companies/:companyId/schools/:schoolId/classes/:classId" component={SchoolClassFormSceneContainer} />
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
      <Route path="practice-tests" component={PracticeTestFormScene} />
      <Route path="users" component={UserListSceneContainer} />
      <Route path="admin-users" component={UserAdminListScene} />
      <Route path="admin-users/new" component={UserAdminFormScene} />
      <Route path="admin-users/:userId" component={UserAdminFormScene} />
      <Route path="distributor-users" component={UserDistributorListSceneContainer} />
      <Route path="companies/:companyId/users/new" component={UserFormScene} />
      <Route path="companies/:companyId/users/:userId" component={UserFormScene} />
      <Route path="companies/:companyId/distributor-users/new" component={UserDistributorFormScene} />
      <Route path="companies/:companyId/distributor-users/:userId" component={UserDistributorFormScene} />
      <Route path="configuration" component={ConfigurationFormScene} />
      <Route path="item-types" component={ItemTypeListScene} />
      <Route path="item-types/new" component={ItemTypeFormSceneContainer} />
      <Route path="item-types/:itemTypeId" component={ItemTypeFormSceneContainer} />
      <Route path="placement-test-levels" component={PlacementTestLevelListScene} />
      <Route path="placement-test-levels/new" component={PlacementTestLevelFormSceneContainer} />
      <Route path="placement-test-levels/:placementTestLevelId" component={PlacementTestLevelFormSceneContainer} />
      <Route path="courses" component={CourseListScene} />
      <Route path="courses/new" component={CourseFormSceneContainer} />
      <Route path="courses/:courseId" component={CourseFormSceneContainer} />
      <Route path="placement-test-items-history" component={PlacementTestItemsListScene} />
      <Route path="student-tests" component={StudentTestListScene} />
      <Route path="student-tests/:studentId" component={StudentTestDetailsScene} />
      <Route path="records/schools" component={FilterRecordScene} />
      <Route path="records/schools/:schoolId/classes" component={SchoolClassRecordScene} />
      <Route path="records/schools/:schoolId/classes/:classId/students" component={StudentRecordScene} />
      <Route path="records/schools/:schoolId/classes/:classId/students/:studentId/detail" component={StudentDetailRecordScene} />
      <Route path="records/students/:studentId/detail" component={StudentDetailRecordScene} />
      <Route path="*" component={NotFoundScene} />
    </Route>
    <Route path="*" component={NotFoundScene} />
  </Router>
);

export default Routes;
