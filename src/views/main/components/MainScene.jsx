import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Menu from '../../../core/layout/Menu';
import ConfirmDialogContainer from './ConfirmDialogContainer';
import Button from '../../../core/form/Button';
import UnReadeMessageCountContainer from '../../message/components/UnReadeMessageCountContainer';

const MainScene = props => (
  <Layout>
    <Layout.Header>
      <Menu
        items={[
          {
            title: 'Profile',
            icon: 'idcard',
            link: '/profile',
            type: 'menu',
            key: 'profile',
          },
          {
            title: 'Dashboard',
            icon: 'dashboard',
            link: '/',
            type: 'menu',
            key: 'dashboard',
          },
          {
            type: 'submenu',
            key: 'admin',
            title: 'Admin',
            icon: 'user',
            allowedFor: ['ADMIN'],
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
                label: 'Item types',
                link: '/item-types',
                group: 'System Configuration',
                icon: 'layout',
                key: 'itemtypes',
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
            groups: [
              {
                group: 'Organizations',
                allowedFor: ['ADMIN', 'DISTRIBUTOR_MANAGER', 'COMPANY_MANAGER', 'SCHOOL_MANAGER', 'TEACHER'],
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
                allowedFor: ['ADMIN'],
                group: 'Organizations',
                icon: 'share-alt',
              },
              {
                label: 'Companies',
                key: 'companies',
                link: '/companies',
                allowedFor: ['ADMIN', 'DISTRIBUTOR_MANAGER'],
                group: 'Organizations',
                icon: 'bank',
              },
              {
                label: 'Schools',
                key: 'schools',
                link: '/schools',
                allowedFor: ['ADMIN', 'DISTRIBUTOR_MANAGER', 'COMPANY_MANAGER'],
                group: 'Organizations',
                icon: 'contacts',
              },
              {
                label: 'Classes',
                key: 'classes',
                link: '/classes',
                allowedFor: ['SCHOOL_MANAGER', 'TEACHER'],
                group: 'Organizations',
                icon: 'profile',
              },
              {
                label: 'Import Schools',
                key: 'import-schools',
                link: '/import-schools',
                allowedFor: ['ADMIN', 'DISTRIBUTOR_MANAGER', 'COMPANY_MANAGER'],
                group: 'Organizations',
                icon: 'file-excel',
              },
              {
                label: 'Admin Users',
                key: 'admin-users',
                link: '/admin-users',
                allowedFor: ['ADMIN'],
                group: 'Users',
              },
              {
                label: 'Distributor Users',
                key: 'distributor-users',
                link: '/distributor-users',
                allowedFor: ['ADMIN', 'DISTRIBUTOR_MANAGER'],
                group: 'Users',
              },
              {
                label: 'Company Users',
                key: 'company-users',
                link: '/company-users',
                allowedFor: ['ADMIN', 'DISTRIBUTOR_MANAGER', 'COMPANY_MANAGER', 'SCHOOL_MANAGER'],
                group: 'Users',
              },
              {
                label: 'Students',
                key: 'students',
                link: '/students',
                allowedFor: ['ADMIN', 'DISTRIBUTOR_MANAGER', 'COMPANY_MANAGER', 'SCHOOL_MANAGER', 'TEACHER'],
                group: 'Users',
              },
              {
                label: 'Import Students',
                key: 'import-students',
                link: '/import-students',
                allowedFor: ['ADMIN', 'DISTRIBUTOR_MANAGER'],
                group: 'Users',
              },
              {
                label: 'Students to Reactivate',
                key: 'reactivate-student',
                link: '/reactivate-student',
                allowedFor: ['ADMIN', 'DISTRIBUTOR_MANAGER', 'COMPANY_MANAGER', 'SCHOOL_MANAGER'],
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
            allowedFor: ['DISTRIBUTOR_MANAGER', 'COMPANY_MANAGER', 'SCHOOL_MANAGER', 'TEACHER'],
          },
          {
            type: 'submenu',
            key: 'content',
            title: 'Content',
            icon: 'book',
            allowedFor: ['ADMIN', 'CONTENT_ADMIN', 'IMAGE_ADMIN', 'AUDIO_CONTENT'],
            groups: [
              {
                group: 'Content',
              },
              {
                group: 'Reports',
                allowedFor: ['ADMIN', 'AUDIO_CONTENT', 'IMAGE_ADMIN', 'CONTENT_ADMIN'],
              },
              {
                group: 'Tests',
                allowedFor: ['ADMIN', 'CONTENT_ADMIN', 'IMAGE_ADMIN', 'AUDIO_CONTENT'],
              },
            ],
            items: [
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
                allowedFor: ['AUDIO_CONTENT', 'ADMIN'],
              },
              {
                label: 'Modules',
                key: 'modules',
                link: '/modules',
                group: 'Content',
                icon: 'book',
                allowedFor: ['ADMIN', 'CONTENT_ADMIN', 'IMAGE_ADMIN', 'AUDIO_CONTENT'],
              },
              {
                label: 'Review',
                key: 'reviews',
                link: '/reviews',
                group: 'Content',
                icon: 'eye-o',
                allowedFor: ['ADMIN', 'CONTENT_ADMIN', 'IMAGE_ADMIN', 'AUDIO_CONTENT'],
              },
              {
                label: 'Approved Images Records',
                key: 'reports-unit-images',
                link: '/reports/unit-images',
                group: 'Reports',
                icon: 'picture',
                allowedFor: ['ADMIN'],
              },
              {
                label: 'Placement Item History',
                key: 'placement-test-items-history',
                link: '/placement-test-items-history',
                group: 'Reports',
                icon: 'info-circle-o',
                allowedFor: ['CONTENT_ADMIN', 'ADMIN'],
              },
              {
                label: 'Unit Items Errors',
                key: 'reports-unit-errors',
                link: '/reports/unit-errors',
                group: 'Reports',
                icon: 'exclamation-circle-o',
                allowedFor: ['ADMIN', 'IMAGE_ADMIN', 'CONTENT_ADMIN'],
              },
              {
                label: 'Items By Words',
                key: 'items-by-words',
                link: '/items-by-words',
                group: 'Reports',
                icon: 'file-text',
                allowedFor: ['ADMIN', 'CONTENT_ADMIN'],
              },
              {
                label: 'Unit Items Execution Stats',
                key: 'unit-items-execution-stats',
                link: '/unit-items-execution-stats',
                group: 'Reports',
                icon: 'warning',
                allowedFor: ['CONTENT_ADMIN', 'ADMIN'],
              },
              {
                label: 'Unit Average Execution Time',
                key: 'unit-average-execution-time',
                link: '/unit-average-execution-time',
                group: 'Reports',
                icon: 'hourglass',
                allowedFor: ['ADMIN'],
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
            allowedFor: ['TEACHER', 'SCHOOL_MANAGER', 'COMPANY_MANAGER', 'ADMIN', 'DISTRIBUTOR_MANAGER', 'CERTIFICATION_TEST_PROFESSIONAL'],
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
            allowedFor: ['TEACHER', 'SCHOOL_MANAGER', 'COMPANY_MANAGER', 'ADMIN', 'DISTRIBUTOR_MANAGER'],
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
            allowedFor: ['ADMIN', 'DISTRIBUTOR_MANAGER', 'COMPANY_MANAGER', 'SCHOOL_MANAGER', 'TEACHER'],
            items: [
              {
                label: 'Usage Stats',
                icon: 'pie-chart',
                key: 'usage-stats',
                link: '/usage-stats',
                allowedFor: ['ADMIN', 'DISTRIBUTOR_MANAGER', 'COMPANY_MANAGER', 'SCHOOL_MANAGER'],
              },
              {
                label: 'Student Close to Finish Course',
                link: '/student-close-to-finish-course',
                key: 'student-close-to-finish-course',
              },
              {
                label: 'Finished Courses',
                link: '/finished-courses',
                key: 'finished-courses',
              },
            ],
          },
          {
            type: 'submenu',
            key: 'config',
            title: 'Config',
            icon: 'setting',
            allowedFor: ['SCHOOL_MANAGER', 'COMPANY_MANAGER', 'ADMIN', 'DISTRIBUTOR_MANAGER'],
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
            key: 'messages',
            link: '/messages',
            icon: 'message',
            allowedFor: ['TEACHER', 'SCHOOL_MANAGER', 'COMPANY_MANAGER', 'ADMIN', 'DISTRIBUTOR_MANAGER'],
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
