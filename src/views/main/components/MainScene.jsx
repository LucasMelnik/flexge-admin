import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Menu from '../../../core/layout/Menu';
import ConfirmDialogContainer from './ConfirmDialogContainer';
import Button from '../../../core/form/Button';
import UnReadeMessageCountContainer from '../../message/components/UnReadeMessageCountContainer';
import { Roles } from '../../../core/util';
// import PendingSuspectUsageAlertCountContainer
//   from '../../suspect-usage-alerts/components/PendingSuspectUsageAlertCountContainer';

const MainScene = props => (
  <Layout>
    <Layout.Header>
      <Menu
        items={[
          {
            title: 'Dashboard',
            icon: 'dashboard',
            link: '/',
            type: 'menu',
            key: 'dashboard',
            allowedFor: [Roles.ADMIN, Roles.SUPPORT, Roles.CONTENT_ADMIN, Roles.IMAGE_ADMIN, Roles.AUDIO_CONTENT, Roles.CERTIFICATION_TEST_PROFESSIONAL, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER, Roles.SCHOOL_MANAGER, Roles.TEACHER],
          },
          {
            title: 'Profile',
            icon: 'idcard',
            link: '/profile',
            type: 'menu',
            key: 'profile',
          },
          {
            title: 'Documents',
            icon: 'folder-add',
            link: '/public-documents',
            type: 'menu',
            key: 'all-documents',
            removeWhenWhitelabel: true,
            allowedFor: [Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER, Roles.SCHOOL_MANAGER, Roles.TEACHER],
          },
          {
            type: 'submenu',
            key: 'admin',
            title: 'Admin',
            icon: 'user',
            allowedFor: [Roles.ADMIN, Roles.SUPPORT],
            groups: [
              {
                group: 'Admin Register',
              },
              {
                group: 'System Configuration',
              },
            ],
            items: [
              {
                label: 'Characters',
                link: '/characters',
                group: 'Admin Register',
                icon: 'user',
                key: 'characters',
              },
              {
                label: 'Courses',
                link: '/courses',
                group: 'Admin Register',
                icon: 'book',
                key: 'courses',
              },
              {
                label: 'Countries',
                link: '/countries',
                group: 'Admin Register',
                icon: 'compass',
                key: 'countries',
              },
              {
                label: 'States',
                link: '/states',
                group: 'Admin Register',
                icon: 'compass',
                key: 'states',
              },
              {
                label: 'Regions',
                link: '/regions',
                group: 'Admin Register',
                icon: 'compass',
                key: 'regions',
              },
              {
                label: 'Documents',
                link: '/documents',
                group: 'Admin Register',
                icon: 'folder-add',
                key: 'documents',
              },
              {
                label: 'Achievements',
                link: '/achievements',
                group: 'System Configuration',
                icon: 'trophy',
                key: 'achievements',
              },
              {
                label: 'General Configuration',
                link: '/configurations',
                group: 'System Configuration',
                icon: 'tool',
                key: 'configuration',
              },
              {
                label: 'Systems Localization',
                link: '/localization',
                group: 'System Configuration',
                icon: 'font-size',
                key: 'localization',
              },
              {
                label: 'Item types',
                link: '/item-types',
                group: 'System Configuration',
                icon: 'layout',
                key: 'itemtypes',
              },
              {
                label: 'Unit types',
                link: '/unit-types',
                group: 'System Configuration',
                icon: 'layout',
                key: 'unittypes',
              },
              {
                label: 'Placement test level',
                link: '/placement-test-levels',
                group: 'System Configuration',
                icon: 'arrow-up',
                key: 'placementtestlevels',
              },
              {
                label: 'Whitelabel',
                link: '/whitelabel-configs',
                group: 'System Configuration',
                icon: 'fork',
                key: 'whitelabelconfig',
              },
            ],
          },
          {
            type: 'submenu',
            key: 'basicregister',
            title: 'Basic Register',
            icon: 'folder',
            allowedFor: [Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER, Roles.SCHOOL_MANAGER, Roles.TEACHER],
            groups: [
              {
                group: 'Organizations',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER, Roles.SCHOOL_MANAGER, Roles.TEACHER],
              },
              {
                group: 'Users',
              },
            ],
            items: [
              {
                label: 'Distributors',
                key: 'distributors',
                link: '/distributors',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT],
                group: 'Organizations',
                icon: 'share-alt',
              },
              {
                label: 'Companies',
                key: 'companies',
                link: '/companies',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER],
                group: 'Organizations',
                icon: 'bank',
              },
              {
                label: 'Schools',
                key: 'schools',
                link: '/schools',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER],
                group: 'Organizations',
                icon: 'contacts',
              },
              {
                label: 'Classes',
                key: 'classes',
                link: '/classes',
                allowedFor: [Roles.SCHOOL_MANAGER, Roles.TEACHER],
                group: 'Organizations',
                icon: 'profile',
              },
              // {
              //   label: 'Content Videos',
              //   key: 'content-videos',
              //   link: '/content-videos',
              //   allowedFor: [Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER],
              //   group: 'Organizations',
              //   icon: 'video-camera',
              // },
              {
                label: 'Data Import',
                key: 'data-import',
                link: '/data-import',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER],
                group: 'Organizations',
                icon: 'file-excel',
              },
              {
                label: 'Admin Users',
                key: 'admin-users',
                link: '/admin-users',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT],
                group: 'Users',
              },
              {
                label: 'Distributor Users',
                key: 'distributor-users',
                link: '/distributor-users',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT],
                group: 'Users',
              },
              {
                label: 'Company Users',
                key: 'company-users',
                link: '/company-users',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER, Roles.SCHOOL_MANAGER],
                group: 'Users',
              },
              {
                label: 'Students',
                key: 'students',
                link: '/students',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER, Roles.SCHOOL_MANAGER, Roles.TEACHER],
                group: 'Users',
              },
              {
                label: 'Import Students',
                key: 'import-students',
                link: '/import-students',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER],
                group: 'Users',
              },
              {
                label: 'Students to Reactivate',
                key: 'reactivate-student',
                link: '/reactivate-student',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER, Roles.SCHOOL_MANAGER],
                group: 'Users',
              },
            ],
          },
          {
            title: 'Search Content',
            icon: 'search',
            link: '/contents',
            type: 'menu',
            key: 'contents',
            allowedFor: [Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER, Roles.SCHOOL_MANAGER, Roles.TEACHER],
          },
          {
            type: 'submenu',
            key: 'content',
            title: 'Content',
            icon: 'book',
            allowedFor: [Roles.ADMIN, Roles.SUPPORT, Roles.CONTENT_ADMIN, Roles.IMAGE_ADMIN, Roles.AUDIO_CONTENT],
            groups: [
              {
                group: 'Content',
              },
              {
                group: 'Reports',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT, Roles.AUDIO_CONTENT, Roles.IMAGE_ADMIN, Roles.CONTENT_ADMIN],
              },
              {
                group: 'Tests',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT, Roles.CONTENT_ADMIN, Roles.IMAGE_ADMIN, Roles.AUDIO_CONTENT],
              },
            ],
            items: [
              {
                label: 'Grammars',
                link: '/grammars',
                key: 'grammars',
                group: 'Content',
                icon: 'tag',
              },
              {
                label: 'Functions of Language',
                link: '/functions-of-language',
                key: 'functionsoflanguage',
                group: 'Content',
                icon: 'tags',
              },
              {
                label: 'Search Content',
                link: '/contents',
                key: 'contents',
                group: 'Content',
                icon: 'search',
              },
              {
                label: 'Audio',
                link: '/item-audios',
                key: 'item-audios',
                group: 'Content',
                icon: 'sound',
                allowedFor: [Roles.AUDIO_CONTENT, Roles.ADMIN, Roles.SUPPORT],
              },
              {
                label: 'Modules',
                key: 'modules',
                link: '/modules',
                group: 'Content',
                icon: 'book',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT, Roles.CONTENT_ADMIN, Roles.IMAGE_ADMIN, Roles.AUDIO_CONTENT],
              },
              {
                label: 'Review',
                key: 'reviews',
                link: '/reviews',
                group: 'Content',
                icon: 'eye-o',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT, Roles.CONTENT_ADMIN, Roles.IMAGE_ADMIN, Roles.AUDIO_CONTENT],
              },
              {
                label: 'Upload Content CSV',
                key: 'upload-content',
                link: '/upload-content',
                group: 'Content',
                icon: 'cloud-upload',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT, Roles.CONTENT_ADMIN],
              },
              {
                label: 'Approved Images Records',
                key: 'reports-unit-images',
                link: '/reports/unit-images',
                group: 'Reports',
                icon: 'picture',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT],
              },
              {
                label: 'Placement Item History',
                key: 'placement-test-items-history',
                link: '/placement-test-items-history',
                group: 'Reports',
                icon: 'info-circle-o',
                allowedFor: [Roles.CONTENT_ADMIN, Roles.ADMIN, Roles.SUPPORT],
              },
              {
                label: 'Unit Items Errors',
                key: 'reports-unit-errors',
                link: '/reports/unit-errors',
                group: 'Reports',
                icon: 'exclamation-circle-o',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT, Roles.IMAGE_ADMIN, Roles.CONTENT_ADMIN],
              },
              {
                label: 'Items By Words',
                key: 'items-by-words',
                link: '/items-by-words',
                group: 'Reports',
                icon: 'file-text',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT, Roles.CONTENT_ADMIN],
              },
              {
                label: 'Items By Word Count Limit',
                key: 'items-by-word-count-limit',
                link: '/items-by-word-count-limit',
                group: 'Reports',
                icon: 'file-text',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT, Roles.CONTENT_ADMIN],
              },
              {
                label: 'Unit Items Execution Stats',
                key: 'unit-items-execution-stats',
                link: '/unit-items-execution-stats',
                group: 'Reports',
                icon: 'warning',
                allowedFor: [Roles.CONTENT_ADMIN, Roles.ADMIN, Roles.SUPPORT],
              },
              {
                label: 'Unit Average Execution Time',
                key: 'unit-average-execution-time',
                link: '/unit-average-execution-time',
                group: 'Reports',
                icon: 'hourglass',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT],
              },
              {
                label: 'Mastery Items Execution Stats',
                key: 'mastery-items-execution-stats',
                link: '/mastery-items-execution-stats',
                group: 'Reports',
                icon: 'warning',
                allowedFor: [Roles.CONTENT_ADMIN, Roles.ADMIN, Roles.SUPPORT],
              },
              {
                label: 'Placement Test',
                key: 'placement-test',
                link: '/placement-test',
                group: 'Tests',
                icon: 'solution',
              },
              {
                label: 'Practice Test',
                key: 'practice-test',
                link: '/practice-test',
                group: 'Tests',
                icon: 'database',
              },
              {
                label: 'Certification Test',
                key: 'certification-test-register',
                link: '/certification-test-register',
                group: 'Tests',
                icon: 'exception',
              },
            ],
          },
          {
            type: 'submenu',
            key: 'academic',
            title: 'Academic',
            icon: 'folder-open',
            allowedFor: [Roles.TEACHER, Roles.SCHOOL_MANAGER, Roles.COMPANY_MANAGER, Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.CERTIFICATION_TEST_PROFESSIONAL],
            items: [
              {
                label: 'Achievements',
                key: 'student-achievements',
                link: '/student-achievements',
                icon: 'trophy',
              },
              {
                label: 'Certification Test',
                key: 'certification-test-executions',
                link: '/certification-test-executions',
                icon: 'contacts',
              },
              {
                label: 'Records',
                key: 'records-filters',
                link: '/records/filters',
                icon: 'database',
              },
              {
                label: 'Kids Certificates',
                key: 'kids-certificates',
                link: '/kids-certificates',
                icon: 'file-done',
              },
              {
                label: 'Student Placement/Mastery Tests',
                key: 'student-tests',
                link: '/student-tests',
              },
            ],
          },
          {
            type: 'submenu',
            key: 'ranking',
            title: 'Ranking',
            icon: 'trophy',
            allowedFor: [Roles.TEACHER, Roles.SCHOOL_MANAGER, Roles.COMPANY_MANAGER, Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER],
            items: [
              {
                label: 'Students',
                icon: 'user',
                key: 'rankings',
                link: '/rankings',
              },
            ],
          },
          {
            type: 'submenu',
            key: 'reports',
            title: 'Reports',
            icon: 'filter',
            allowedFor: [Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER, Roles.SCHOOL_MANAGER, Roles.TEACHER, Roles.SPEECHACE],
            items: [
              {
                label: 'Usage Stats',
                icon: 'pie-chart',
                key: 'usage-stats',
                link: '/usage-stats',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER, Roles.SCHOOL_MANAGER, Roles.SPEECHACE],
              },
              {
                label: 'Suspect Usage Alerts',
                icon: 'alert',
                link: '/suspect-usage-alerts',
                key: 'suspect-usage-alerts',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT],
              },
              {
                label: 'Student Close to Finish Course',
                link: '/student-close-to-finish-course',
                key: 'student-close-to-finish-course',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER, Roles.SCHOOL_MANAGER, Roles.TEACHER],
              },
              {
                label: 'Finished Courses',
                link: '/finished-courses',
                key: 'finished-courses',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER, Roles.SCHOOL_MANAGER, Roles.TEACHER],
              },
              {
                label: 'Active Students by Course',
                link: '/active-students-by-course',
                key: 'active-students-by-course',
                allowedFor: [Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER, Roles.COMPANY_MANAGER, Roles.SCHOOL_MANAGER, Roles.TEACHER],
              },
            ],
          },
          {
            type: 'submenu',
            key: 'config',
            title: 'Config',
            icon: 'setting',
            allowedFor: [Roles.SCHOOL_MANAGER, Roles.COMPANY_MANAGER, Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER],
            items: [
              {
                label: 'Emails',
                link: '/school-configuration/emails',
                key: 'school-configuration/emails',
                icon: 'mail',
              },
              {
                label: 'Evaluation Periods',
                link: '/evaluation-templates',
                key: 'evaluation-templates',
                icon: 'calendar',
              },
              {
                label: 'Grades',
                link: '/school-configuration/grades',
                key: 'school-configuration/grades',
                icon: 'table',
              },
            ],
          },
          {
            type: 'menu',
            title: 'Payments',
            link: '/payments',
            icon: 'dollar',
            key: 'payments',
            allowedFor: [Roles.ADMIN, Roles.SUPPORT]
          },
          {
            type: 'menu',
            key: 'messages',
            link: '/messages',
            icon: 'message',
            allowedFor: [Roles.TEACHER, Roles.SCHOOL_MANAGER, Roles.COMPANY_MANAGER, Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER],
            title: (
              <UnReadeMessageCountContainer>
                <span style={{ color: 'hsla(0,0%,100%,.65)' }}>Messages</span>
              </UnReadeMessageCountContainer>
            ),
          },
        ]}
      />
      <div
        style={{
          float: 'right',
        }}
      >
        <Button
          icon="poweroff"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        />
      </div>
    </Layout.Header>
    <Layout.Content
      style={{
        padding: 10,
        minHeight: '100vh',
      }}
    >
      {props.children}
      <ConfirmDialogContainer />
    </Layout.Content>
  </Layout>
);

MainScene.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainScene;
