import React from 'react';
import ReactGA from 'react-ga';
import {browserHistory, IndexRoute, Route, Router} from 'react-router';

import LoginScene from './views/login/components/LoginScene';
import MainScene from './views/main/components/MainScene';
import DashboardScene from './views/dashboard/components/DashboardScene';

import CompanyListScene from './views/company/components/CompanyListScene';
import CompanyFormSceneContainer from './views/company/components/CompanyFormSceneContainer';
import CompanyDetailSceneContainer from './views/company/components/CompanyDetailSceneContainer';

import DistributorListScene from './views/distributor/components/DistributorListScene';
import DistributorFormScene from './views/distributor/components/DistributorFormScene';
import DistributorDetailSceneContainer from './views/distributor/components/DistributorDetailSceneContainer';
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
import UnitReviewItemListSceneContainer
  from './views/module/components/unit/unit-item/UnitReviewItemListSceneContainer';

import ReviewListSceneContainer from './views/unit-review/components/ReviewListSceneContainer';
import ReviewFormSceneContainer from './views/unit-review/components/ReviewFormSceneContainer';

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

import FilterRecordScene from './views/records/components/FilterRecordScene';
import SchoolClassRecordSceneContainer from './views/records/components/school-class/SchoolClassRecordSceneContainer';
import StudentRecordSceneContainer from './views/records/components/student/StudentRecordSceneContainer';
import StudentDetailRecordSceneContainer
  from './views/records/components/student-detail/StudentDetailRecordSceneContainer';
import UnitImageRecordScene from './views/reports/components/unit-image/UnitImageRecordScene';
import UnitItemErrorRecordScene from './views/reports/components/unit-error/UnitItemErrorRecordScene';
import ItemAudioListScene from './views/item-audio/components/ItemAudioListScene';

import AdminUserListScene from './views/user/components/AdminUserListScene';
import AdminUserFormScene from './views/user/components/AdminUserFormScene';
import CompanyUserListScene from './views/user/components/CompanyUserListScene';
import CompanyUserFormScene from './views/user/components/CompanyUserFormScene';
import DistributorUserListScene from './views/user/components/DistributorUserListScene';
import DistributorUserFormScene from './views/user/components/DistributorUserFormScene';
import StudentListScene from './views/student/components/StudentListScene';
import CertificationTestExecutionListScene
  from './views/certification-test-execution/components/CertificationTestExecutionListScene';
import RankingListScene from './views/ranking/components/RankingListScene';
import SchoolGradeConfigFormSceneContainer
  from './views/school-grade-config/components/SchoolGradeConfigFormSceneContainer';
import SchoolClassListSceneContainer from './views/school-class/components/SchoolClassListSceneContainer';
import ImportStudentsFormScene from './views/import-students/components/ImportStudentsFormScene';
import ReactivateStudentListScene from './views/reactivate-student/components/ReactivateStudentListScene';
import ReactivateStudentFormScene from './views/reactivate-student/components/ReactivateStudentFormScene';
import CertificationTestRegisterListScene
  from './views/certification-test-register/components/CertificationTestRegisterListScene';
import CertificationTestRegisterFormScene
  from './views/certification-test-register/components/CertificationTestRegisterFormScene';
import CertificationTestExecutionFormScene
  from './views/certification-test-execution/components/CertificationTestExecutionFormScene';
import CertificationTestExecutionDetailScene
  from './views/certification-test-execution/components/CertificationTestExecutionDetailScene';
import EmailConfigFormSceneContainer from './views/email-config/components/EmailConfigFormSceneContainer';
import UnitItemExecutionStatsListScene
  from './views/reports/components/unit-execution-stats/UnitItemExecutionStatsListScene';
import ItemByWordsListScene from './views/reports/components/item-by-words/ItemByWordsListScene';
import EvaluationTemplateListScene from './views/evaluation-template/components/EvaluationTemplateListScene';
import EvaluationTemplateFormScene from './views/evaluation-template/components/EvaluationTemplateFormScene';
import UsageStatsListScene from './views/usage-stats/components/UsageStatsListScene';
import StudentAchievementsListScene from './views/student-achievements/components/StudentAchievementsListScene';
import UnitAverageExecutionTimeListScene
  from './views/reports/components/unit-average-execution-time/UnitAverageExecutionTimeListScene';
import MessageListScene from './views/message/components/MessageListScene';
import MessageFormScene from './views/message/components/MessageFormScene';
import MessageChatSceneContainer from './views/message/components/MessageChatSceneContainer';
import ProfileFormScene from './views/profile/components/ProfileFormScene';
import StudentCloseToFinishCourseListScene
  from './views/reports/components/student-close-to-finish-course/StudentCloseToFinishCourseListScene';
import FinishedStudentCourseListScene
  from './views/reports/components/finished-student-course/FinishedStudentCourseListScene';
import ContentListScene from './views/content/components/ContentListScene';
import ContentDetailSceneContainer from './views/content/components/detail/ContentDetailSceneContainer';
import CountryListScene from './views/country/components/CountryListScene';
import CountryFormScene from './views/country/components/CountryFormScene';
import StateListScene from './views/state/components/StateListScene';
import StateFormScene from './views/state/components/StateFormScene';
import ConfigurationListScene from './views/configuration/components/ConfigurationListScene';
import WhitelabelConfigListScene from './views/whitelabel-config/components/WhitelabelConfigListScene';
import WhitelabelConfigFormScene from './views/whitelabel-config/components/WhitelabelConfigFormScene';
import KidsCertificatesListScene from './views/kids-certificates/components/KidsCertificatesListScene';
import DataImportScene from './views/data-import/components/DataImportScene';
import DocumentListScene from './views/document/components/DocumentListScene';
import DocumentFormScene from './views/document/components/DocumentFormScene';
import PublicDocumentListScene from './views/document/components/PublicDocumentListScene';
import CourseStudentCountListScene from './views/reports/components/course-student-count/CourseStudentCountListScene';
import SuspectUsageAlertScene from './views/suspect-usage-alerts/components/SuspectUsageAlertScene';
import MasteryTestItemExecutionStatsListScene
  from './views/reports/components/mastery-test-item-execution-stats/MasteryTestItemExecutionStatsListScene';
import ItemByWordCountLimitListScene
  from './views/reports/components/item-by-word-count-limit/ItemByWordCountLimitListScene';
import UnitTypeListScene from './views/unit-type/components/UnitTypeListScene';
import UnitTypeFormScene from './views/unit-type/components/UnitTypeFormScene';
import PaymentListScene from './views/payment/components/PaymentListScene';
import PaymentFormScene from './views/payment/components/PaymentFormScene';
import UploadContentScene from './views/upload-content/components/UploadContentScene';
import LocalizationListScene from './views/localization/components/LocalizationListScene';
import LocalizationFormScene from './views/localization/components/LocalizationFormScene';
import GrammarFormScene from './views/grammar/components/GrammarFormScene';
import GrammarListScene from './views/grammar/components/GrammarListScene';
import FunctionOfLanguageListScene from './views/function-of-language/components/FunctionOfLanguageListScene';
import FunctionOfLanguageFormScene from './views/function-of-language/components/FunctionOfLanguageFormScene';
import ContentVideoListScene from './views/content-video/components/ContentVideoListScene';
import ContentVideoFormSceneContainer from './views/content-video/components/ContentVideoFormSceneContainer';

function authRequired(nextState, replace) {
  if (!localStorage.accessToken) {
    replace('/login');
  }
}

if (process.env.REACT_APP_GA_ID) {
  ReactGA.initialize(process.env.REACT_APP_GA_ID);
  browserHistory.listen(location => ReactGA.pageview(location.pathname));
}

const Routes = () => (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
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
      <Route path="schools" component={SchoolListScene} />
      <Route path="schools/new" component={SchoolFormSceneContainer} />
      <Route path="schools/:schoolId" component={SchoolFormSceneContainer} />
      <Route path="schools/:schoolId/details" component={SchoolDetailSceneContainer} />
      <Route path="schools/:schoolId/classes/new" component={SchoolClassFormSceneContainer} />
      <Route path="schools/:schoolId/classes/:classId" component={SchoolClassFormSceneContainer} />
      <Route path="schools/:schoolId/classes/:classId/details" component={SchoolClassDetailSceneContainer} />
      <Route path="schools/:schoolId/classes/:classId/students/new" component={StudentFormSceneContainer} />
      <Route path="schools/:schoolId/classes/:classId/students/:studentId" component={StudentFormSceneContainer} />
      <Route path="classes" component={SchoolClassListSceneContainer} />
      <Route path="classes/new" component={SchoolClassFormSceneContainer} />
      <Route path="classes/:classId" component={SchoolClassFormSceneContainer} />
      <Route path="classes/:classId/details" component={SchoolClassDetailSceneContainer} />
      <Route path="classes/:classId/students/new" component={StudentFormSceneContainer} />
      <Route path="classes/:classId/students/:studentId" component={StudentFormSceneContainer} />
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
      <Route path="reviews" component={ReviewListSceneContainer} />
      <Route path="modules/:moduleId/units/:unitId/reviews/:reviewId" component={ReviewFormSceneContainer} />
      <Route path="practice-test" component={PracticeTestFormScene} />
      <Route path="admin-users" component={AdminUserListScene} />
      <Route path="admin-users/new" component={AdminUserFormScene} />
      <Route path="admin-users/:userId" component={AdminUserFormScene} />
      <Route path="company-users" component={CompanyUserListScene} />
      <Route path="company-users/new" component={CompanyUserFormScene} />
      <Route path="company-users/:userId" component={CompanyUserFormScene} />
      <Route path="distributor-users" component={DistributorUserListScene} />
      <Route path="distributors-users/new" component={DistributorUserFormScene} />
      <Route path="distributors-users/:userId" component={DistributorUserFormScene} />
      <Route path="configurations" component={ConfigurationListScene} />
      <Route path="configurations/new" component={ConfigurationFormScene} />
      <Route path="configurations/:configurationId" component={ConfigurationFormScene} />
      <Route path="item-types" component={ItemTypeListScene} />
      <Route path="item-types/new" component={ItemTypeFormScene} />
      <Route path="item-types/:itemTypeId" component={ItemTypeFormScene} />
      <Route path="placement-test-levels" component={PlacementTestLevelListScene} />
      <Route path="placement-test-levels/new" component={PlacementTestLevelFormScene} />
      <Route path="placement-test-levels/:placementTestLevelId" component={PlacementTestLevelFormScene} />
      <Route path="courses" component={CourseListScene} />
      <Route path="courses/new" component={CourseFormScene} />
      <Route path="courses/:courseId" component={CourseFormScene} />
      <Route path="characters" component={CharacterListScene}/>
      <Route path="characters/new" component={CharacterFormScene}/>
      <Route path="characters/:characterId" component={CharacterFormScene}/>
      <Route path="public-documents" component={PublicDocumentListScene}/>
      <Route path="documents" component={DocumentListScene}/>
      <Route path="documents/new" component={DocumentFormScene}/>
      <Route path="documents/:documentId" component={DocumentFormScene}/>
      <Route path="countries" component={CountryListScene}/>
      <Route path="countries/new" component={CountryFormScene}/>
      <Route path="countries/:countryId" component={CountryFormScene}/>
      <Route path="grammars" component={GrammarListScene}/>
      <Route path="grammars/new" component={GrammarFormScene}/>
      <Route path="grammars/:grammarId" component={GrammarFormScene}/>
      <Route path="functions-of-language" component={FunctionOfLanguageListScene}/>
      <Route path="functions-of-language/new" component={FunctionOfLanguageFormScene}/>
      <Route path="functions-of-language/:functionId" component={FunctionOfLanguageFormScene}/>
      <Route path="states" component={StateListScene}/>
      <Route path="states/new" component={StateFormScene}/>
      <Route path="states/:stateId" component={StateFormScene}/>
      <Route path="regions" component={RegionListScene}/>
      <Route path="regions/new" component={RegionFormScene}/>
      <Route path="regions/:regionId" component={RegionFormScene}/>
      <Route path="placement-test-items-history" component={PlacementTestItemsListScene}/>
      <Route path="student-tests" component={StudentTestListScene}/>
      <Route path="student-tests/:studentId" component={StudentTestDetailsScene}/>
      <Route path="records/filters" component={FilterRecordScene}/>
      <Route path="records/schools/:schoolId/classes" component={SchoolClassRecordSceneContainer} />
      <Route path="records/schools/:schoolId/classes/:classId/students" component={StudentRecordSceneContainer} />
      <Route path="records/schools/:schoolId/classes/:classId/students/:studentId/detail" component={StudentDetailRecordSceneContainer} />
      <Route path="reports/unit-images" component={UnitImageRecordScene} />
      <Route path="reports/unit-errors" component={UnitItemErrorRecordScene} />
      <Route path="item-audios" component={ItemAudioListScene} />
      <Route path="achievements" component={AchievementListScene} />
      <Route path="achievements/new" component={AchievementFormScene} />
      <Route path="achievements/:achievementId" component={AchievementFormScene} />
      <Route path="certification-test-executions" component={CertificationTestExecutionListScene} />
      <Route path="certification-test-executions/:certificationTestId" component={CertificationTestExecutionFormScene} />
      <Route path="certification-test-executions/:certificationTestId/details" component={CertificationTestExecutionDetailScene} />
      <Route path="school-configuration/emails" component={EmailConfigFormSceneContainer} />
      <Route path="school-configuration/grades" component={SchoolGradeConfigFormSceneContainer} />
      <Route path="evaluation-templates" component={EvaluationTemplateListScene} />
      <Route path="evaluation-templates/new" component={EvaluationTemplateFormScene} />
      <Route path="evaluation-templates/:evaluationTemplateId" component={EvaluationTemplateFormScene} />
      <Route path="rankings" component={RankingListScene} />
      <Route path="student-achievements" component={StudentAchievementsListScene} />
      <Route path="data-import" component={DataImportScene} />
      <Route path="import-students" component={ImportStudentsFormScene} />
      <Route path="reactivate-student" component={ReactivateStudentListScene} />
      <Route path="schools/:schoolId/reactivate-student/:studentId" component={ReactivateStudentFormScene} />
      <Route path="certification-test-register" component={CertificationTestRegisterListScene} />
      <Route path="certification-test-register/new" component={CertificationTestRegisterFormScene} />
      <Route path="certification-test-register/:certificationTestId" component={CertificationTestRegisterFormScene} />
      <Route path="unit-items-execution-stats" component={UnitItemExecutionStatsListScene} />
      <Route path="unit-average-execution-time" component={UnitAverageExecutionTimeListScene} />
      <Route path="items-by-words" component={ItemByWordsListScene} />
      <Route path="usage-stats" component={UsageStatsListScene} />
      <Route path="messages" component={MessageListScene} />
      <Route path="new-message" component={MessageFormScene} />
      <Route path="messages/:id/chat" component={MessageChatSceneContainer} />
      <Route path="profile" component={ProfileFormScene} />
      <Route path="student-close-to-finish-course" component={StudentCloseToFinishCourseListScene} />
      <Route path="finished-courses" component={FinishedStudentCourseListScene} />
      <Route path="contents" component={ContentListScene} />
      <Route path="contents/:contentId/details" component={ContentDetailSceneContainer} />
      <Route path="whitelabel-configs" component={WhitelabelConfigListScene} />
      <Route path="whitelabel-configs/new" component={WhitelabelConfigFormScene} />
      <Route path="whitelabel-configs/:whitelabelConfigId" component={WhitelabelConfigFormScene} />
      <Route path="kids-certificates" component={KidsCertificatesListScene} />
      <Route path="active-students-by-course" component={CourseStudentCountListScene} />
      <Route path="suspect-usage-alerts" component={SuspectUsageAlertScene} />
      <Route path="mastery-items-execution-stats" component={MasteryTestItemExecutionStatsListScene}/>
      <Route path="items-by-word-count-limit" component={ItemByWordCountLimitListScene}/>
      <Route path="unit-types" component={UnitTypeListScene}/>
      <Route path="unit-types/new" component={UnitTypeFormScene}/>
      <Route path="unit-types/:typeId" component={UnitTypeFormScene}/>
      <Route path="payments" component={PaymentListScene}/>
      <Route path="payments/new" component={PaymentFormScene}/>
      <Route path="upload-content" component={UploadContentScene}/>
      <Route path="localization" component={LocalizationListScene}/>
      <Route path="localization/new" component={LocalizationFormScene}/>
      <Route path="content-videos" component={ContentVideoListScene}/>
      <Route path="content-videos/new" component={ContentVideoFormSceneContainer}/>
      <Route path="content-videos/:contentVideoId" component={ContentVideoFormSceneContainer}/>
      <Route path="*" component={NotFoundScene}/>
    </Route>
    <Route path="*" component={NotFoundScene}/>
  </Router>
);

export default Routes;
