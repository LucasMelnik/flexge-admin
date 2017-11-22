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
//
// import TeacherListScene from './views/teacher/components/TeacherListScene';
// import TeacherFormScene from './views/teacher/components/TeacherFormScene';
//
import SchoolListScene from './views/school/components/SchoolListScene';
import SchoolFormSceneContainer from './views/school/components/SchoolFormSceneContainer';
import SchoolDetailSceneContainer from './views/school/components/SchoolDetailSceneContainer';
import SchoolClassFormSceneContainer from './views/school-class/components/SchoolClassFormSceneContainer';
import SchoolClassDetailSceneContainer from './views/school-class/components/SchoolClassDetailSceneContainer';
import StudentFormSceneContainer from './views/student/components/StudentFormSceneContainer';

import ModuleListScene from './views/module/components/ModuleListScene';
import ModuleFormScene from './views/module/components/ModuleFormScene';
import ModuleDetailSceneContainer from './views/module/components/ModuleDetailSceneContainer';
import MasteryTestFormSceneContainer from './views/mastery-test/components/MasteryTestFormSceneContainer';
import UnitFormSceneContainer from './views/module/components/unit/UnitFormSceneContainer';
import UnitItemListSceneContainer from './views/module/components/unit/unit-item/UnitItemListSceneContainer';
import UnitItemFormSceneContainer from './views/module/components/unit/unit-item/UnitItemFormSceneContainer';
import UnitReviewItemListSceneContainer from './views/module/components/unit/unit-item/UnitReviewItemListSceneContainer';
//
// import ReviewListSceneContainer from './views/unit-review/components/ReviewListSceneContainer';
// import ReviewFormSceneContainer from './views/unit-review/components/ReviewFormSceneContainer';

import PlacementTestListScene from './views/placement-test/components/PlacementTestListScene';
import PlacementTestFormScene from './views/placement-test/components/PlacementTestFormScene';
import PracticeTestFormScene from './views/practice-test/components/PracticeTestFormScene';

import NotFoundScene from './views/not-found/components/NotFoundScene';
import ConfigurationFormScene from './views/configuration/components/ConfigurationFormScene';
import ItemTypeListScene from './views/item-type/components/ItemTypeListScene';
import ItemTypeFormScene from './views/item-type/components/ItemTypeFormScene';
import CourseListScene from './views/course/components/CourseListScene';
import CourseFormScene from './views/course/components/CourseFormScene';
import PlacementTestLevelFormScene from './views/placement-test-level/components/PlacementTestLevelFormScene';
import PlacementTestLevelListScene from './views/placement-test-level/components/PlacementTestLevelListScene';
import PlacementTestItemsListScene from './views/placement-test-items/components/PlacementTestItemsListScene';
import StudentTestListScene from './views/student-test/components/StudentTestListScene';
import StudentTestDetailsScene from './views/student-test/components/StudentTestDetailsScene';
import RegionListScene from './views/region/components/RegionListScene';
import RegionFormScene from './views/region/components/RegionFormScene';
import CharacterListScene from './views/character/components/CharacterListScene';
import CharacterFormScene from './views/character/components/CharacterFormScene';
import AchievementListScene from './views/achievement/components/AchievementListScene';
import AchievementFormScene from './views/achievement/components/AchievementFormScene';
//
import FilterRecordScene from './views/reports/components/FilterRecordScene';
import SchoolClassRecordScene from './views/reports/components/school-class/SchoolClassRecordScene';
import StudentRecordScene from './views/reports/components/student/StudentRecordScene';
import StudentDetailRecordScene from './views/reports/components/student-detail/StudentDetailRecordScene';
// import UnitImageRecordScene from './views/reports/components/unit-image/UnitImageRecordScene';
// import UnitItemErrorRecordScene from './views/reports/components/unit-error/UnitItemErrorRecordScene';
// import ItemAudioListScene from './views/item-audio/components/ItemAudioListScene';

import AdminUserListScene from './views/user/components/AdminUserListScene';
import AdminUserFormScene from './views/user/components/AdminUserFormScene';
import CompanyUserListSceneContainer from './views/user/components/CompanyUserListSceneContainer';
import CompanyUserFormScene from './views/user/components/CompanyUserFormScene';
import DistributorUserListSceneContainer from './views/user/components/DistributorUserListSceneContainer';
import DistributorUserFormScene from './views/user/components/DistributorUserFormScene';
import StudentListScene from './views/student/components/StudentListScene';

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
      <Route path="distributors" component={DistributorListScene} />
      <Route path="distributors/new" component={DistributorFormScene} />
      <Route path="distributors/:distributorId" component={DistributorFormScene} />
      <Route path="distributors/:distributorId/details" component={DistributorDetailSceneContainer} />
      <Route path="distributors/:distributorId/companies/:companyId/details" component={CompanyDetailSceneContainer} />
      <Route path="distributors/:distributorId/companies/new" component={CompanyFormSceneContainer} />
      <Route path="distributors/:distributorId/companies/:companyId" component={CompanyFormSceneContainer} />
      <Route path="distributors/:distributorId/companies/:companyId/schools/:schoolId/details" component={SchoolDetailSceneContainer} />
      <Route path="distributors/:distributorId/companies/:companyId/schools/new" component={SchoolFormSceneContainer} />
      <Route path="distributors/:distributorId/companies/:companyId/schools/:schoolId" component={SchoolFormSceneContainer} />
      <Route path="distributors/:distributorId/companies/:companyId/schools/:schoolId/classes/new" component={SchoolClassFormSceneContainer} />
      <Route path="distributors/:distributorId/companies/:companyId/schools/:schoolId/classes/:classId" component={SchoolClassFormSceneContainer} />
      <Route path="distributors/:distributorId/companies/:companyId/schools/:schoolId/classes/:classId/details" component={SchoolClassDetailSceneContainer} />
      <Route path="distributors/:distributorId/companies/:companyId/schools/:schoolId/classes/:classId/students/new" component={StudentFormSceneContainer} />
      <Route path="distributors/:distributorId/companies/:companyId/schools/:schoolId/classes/:classId/students/:studentId" component={StudentFormSceneContainer} />
      <Route path="companies" component={CompanyListScene} />
      <Route path="companies/new" component={CompanyFormSceneContainer} />
      <Route path="companies/:companyId" component={CompanyFormSceneContainer} />
      <Route path="companies/:companyId/details" component={CompanyDetailSceneContainer} />
      <Route path="companies/:companyId/schools/new" component={SchoolFormSceneContainer} />
      <Route path="companies/:companyId/schools/:schoolId" component={SchoolFormSceneContainer} />
      <Route path="companies/:companyId/schools/:schoolId/details" component={SchoolDetailSceneContainer} />
      <Route path="companies/:companyId/schools/:schoolId/classes/new" component={SchoolClassFormSceneContainer} />
      <Route path="companies/:companyId/schools/:schoolId/classes/:classId" component={SchoolClassFormSceneContainer} />
      <Route path="companies/:companyId/schools/:schoolId/classes/:classId/details" component={SchoolClassDetailSceneContainer} />
      <Route path="companies/:companyId/schools/:schoolId/classes/:classId/students/new" component={StudentFormSceneContainer} />
      <Route path="companies/:companyId/schools/:schoolId/classes/:classId/students/:studentId" component={StudentFormSceneContainer} />
      {/*<Route path="teachers" component={TeacherListScene} />*/}
      {/*<Route path="teachers/new" component={TeacherFormScene} />*/}
      {/*<Route path="teachers/:teacherId" component={TeacherFormScene} />*/}
      <Route path="schools" component={SchoolListScene} />
      <Route path="schools/new" component={SchoolFormSceneContainer} />
      <Route path="schools/:schoolId" component={SchoolFormSceneContainer} />
      <Route path="schools/:schoolId/details" component={SchoolDetailSceneContainer} />
      <Route path="schools/:schoolId/classes/new" component={SchoolClassFormSceneContainer} />
      <Route path="schools/:schoolId/classes/:classId" component={SchoolClassFormSceneContainer} />
      <Route path="schools/:schoolId/classes/:classId/details" component={SchoolClassDetailSceneContainer} />
      <Route path="schools/:schoolId/classes/:classId/students/new" component={StudentFormSceneContainer} />
      <Route path="schools/:schoolId/classes/:classId/students/:studentId" component={StudentFormSceneContainer} />
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
      <Route path="placement-test" component={PlacementTestListScene} />
      <Route path="placement-test/new" component={PlacementTestFormScene} />
      <Route path="placement-test/:placementTestId" component={PlacementTestFormScene} />
      {/*<Route path="reviews" component={ReviewListSceneContainer} />*/}
      {/*<Route path="modules/:moduleId/units/:unitId/reviews/:reviewId" component={ReviewFormSceneContainer} />*/}
      <Route path="practice-tests" component={PracticeTestFormScene} />
      <Route path="admin-users" component={AdminUserListScene} />
      <Route path="admin-users/new" component={AdminUserFormScene} />
      <Route path="admin-users/:userId" component={AdminUserFormScene} />
      <Route path="company-users" component={CompanyUserListSceneContainer} />
      <Route path="companies/:companyId/users/new" component={CompanyUserFormScene} />
      <Route path="companies/:companyId/users/:userId" component={CompanyUserFormScene} />
      <Route path="distributor-users" component={DistributorUserListSceneContainer} />
      <Route path="distributors/:distributorId/users/new" component={DistributorUserFormScene} />
      <Route path="distributors/:distributorId/users/:userId" component={DistributorUserFormScene} />
      <Route path="configuration" component={ConfigurationFormScene} />
      <Route path="item-types" component={ItemTypeListScene} />
      <Route path="item-types/new" component={ItemTypeFormScene} />
      <Route path="item-types/:itemTypeId" component={ItemTypeFormScene} />
      <Route path="placement-test-levels" component={PlacementTestLevelListScene} />
      <Route path="placement-test-levels/new" component={PlacementTestLevelFormScene} />
      <Route path="placement-test-levels/:placementTestLevelId" component={PlacementTestLevelFormScene} />
      <Route path="courses" component={CourseListScene} />
      <Route path="courses/new" component={CourseFormScene} />
      <Route path="courses/:courseId" component={CourseFormScene} />
      <Route path="characters" component={CharacterListScene} />
      <Route path="characters/new" component={CharacterFormScene} />
      <Route path="characters/:characterId" component={CharacterFormScene} />
      <Route path="regions" component={RegionListScene} />
      <Route path="regions/new" component={RegionFormScene} />
      <Route path="regions/:regionId" component={RegionFormScene} />
      <Route path="placement-test-items-history" component={PlacementTestItemsListScene} />
      <Route path="student-tests" component={StudentTestListScene} />
      <Route path="student-tests/:studentId" component={StudentTestDetailsScene} />
      <Route path="records/filters" component={FilterRecordScene} />
      <Route path="records/schools/:schoolId/classes" component={SchoolClassRecordScene} />
      <Route path="records/schools/:schoolId/classes/:classId/students" component={StudentRecordScene} />
      <Route path="records/schools/:schoolId/classes/:classId/students/:studentId/detail" component={StudentDetailRecordScene} />
      <Route path="records/students/:studentId/detail" component={StudentDetailRecordScene} />
      {/*<Route path="records/unit-images" component={UnitImageRecordScene} />*/}
      {/*<Route path="records/unit-errors" component={UnitItemErrorRecordScene} />*/}
      {/*<Route path="item-audios" component={ItemAudioListScene} />*/}
      <Route path="achievements" component={AchievementListScene} />
      <Route path="achievements/new" component={AchievementFormScene} />
      <Route path="achievements/:achievementId" component={AchievementFormScene} />
      <Route path="*" component={NotFoundScene} />
    </Route>
    <Route path="*" component={NotFoundScene} />
  </Router>
);

export default Routes;
