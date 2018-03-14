import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Menu from '../../../core/layout/Menu';
import MenuItem from '../../../core/layout/MenuItem';
import SubMenu from '../../../core/layout/SubMenu';
import ConfirmDialogContainer from './ConfirmDialogContainer';
import Button from '../../../core/form/Button';

const MainScene = props => (
  <Layout>
    <Layout.Header>
      <Menu>
        <MenuItem
          title="Dashboard"
          icon="dashboard"
          link="/"
        />
        <SubMenu
          title="Admin"
          icon="user"
          allowedFor={['ADMIN']}
          groups={[
            {
              group: 'Admin Register',
            },
            {
              group: 'System Configuration',
            },
          ]}
          items={[
            {
              label: 'Characters',
              link: '/characters',
              group: 'Admin Register',
              icon: 'user',
            },
            {
              label: 'Courses',
              link: '/courses',
              group: 'Admin Register',
              icon: 'book',
            },
            {
              label: 'Regions',
              link: '/regions',
              group: 'Admin Register',
              icon: 'compass',
            },
            {
              label: 'Achievements',
              link: '/achievements',
              group: 'System Configuration',
              icon: 'trophy',
            },
            {
              label: 'General Configuration',
              link: '/configuration',
              group: 'System Configuration',
              icon: 'tool',
            },
            {
              label: 'Item types',
              link: '/item-types',
              group: 'System Configuration',
              icon: 'layout',
            },
            {
              label: 'Placement test level',
              link: '/placement-test-levels',
              group: 'System Configuration',
              icon: 'arrow-up',
            },
          ]}
        />
        <SubMenu
          title="Basic Register"
          icon="folder"
          groups={[
            {
              group: 'Organizations',
              allowedFor: ['ADMIN', 'DISTRIBUTOR_MANAGER', 'COMPANY_MANAGER', 'SCHOOL_MANAGER', 'TEACHER'],
            },
            {
              group: 'Users',
            },
          ]}
          items={[
            {
              label: 'Distributors',
              link: '/distributors',
              allowedFor: ['ADMIN'],
              group: 'Organizations',
              icon: 'share-alt',
            },
            {
              label: 'Companies',
              link: '/companies',
              allowedFor: ['ADMIN', 'DISTRIBUTOR_MANAGER'],
              group: 'Organizations',
              icon: 'bank',
            },
            {
              label: 'Schools',
              link: '/schools',
              allowedFor: ['ADMIN', 'DISTRIBUTOR_MANAGER', 'COMPANY_MANAGER'],
              group: 'Organizations',
              icon: 'contacts',
            },
            {
              label: 'Classes',
              link: '/classes',
              allowedFor: ['SCHOOL_MANAGER', 'TEACHER'],
              group: 'Organizations',
              icon: 'profile',
            },
            {
              label: 'Admin Users',
              link: '/admin-users',
              allowedFor: ['ADMIN'],
              group: 'Users',
            },
            {
              label: 'Distributor Users',
              link: '/distributor-users',
              allowedFor: ['ADMIN', 'DISTRIBUTOR_MANAGER'],
              group: 'Users',
            },
            {
              label: 'Company Users',
              link: '/company-users',
              allowedFor: ['ADMIN', 'DISTRIBUTOR_MANAGER', 'COMPANY_MANAGER', 'SCHOOL_MANAGER'],
              group: 'Users',
            },
            {
              label: 'Students',
              link: '/students',
              allowedFor: ['ADMIN', 'DISTRIBUTOR_MANAGER', 'COMPANY_MANAGER', 'SCHOOL_MANAGER', 'TEACHER'],
              group: 'Users',
            },
            {
              label: 'Import Students',
              link: '/import-students',
              allowedFor: ['ADMIN', 'DISTRIBUTOR_MANAGER'],
              group: 'Users',
            },
            {
              label: 'Students to Reactivate',
              link: '/reactivate-student',
              allowedFor: ['ADMIN', 'DISTRIBUTOR_MANAGER', 'COMPANY_MANAGER', 'SCHOOL_MANAGER'],
              group: 'Users',
            },
          ]}
        />
        <SubMenu
          title="Content"
          icon="book"
          allowedFor={['ADMIN', 'CONTENT_ADMIN', 'IMAGE_ADMIN', 'AUDIO_CONTENT']}
          groups={[
            {
              group: 'Content',
            },
            {
              group: 'Reports',
              allowedFor: ['ADMIN', 'AUDIO_CONTENT', 'IMAGE_ADMIN'],
            },
            {
              group: 'Tests',
            },
          ]}
          items={[
            {
              label: 'Audio',
              link: '/item-audios',
              group: 'Content',
              icon: 'sound',
              allowedFor: ['AUDIO_CONTENT', 'ADMIN'],
            },
            {
              label: 'Modules',
              link: '/modules',
              group: 'Content',
              icon: 'book',
            },
            {
              label: 'Review',
              link: '/reviews',
              group: 'Content',
              icon: 'eye-o',
            },
            {
              label: 'Approved Images Records',
              link: '/reports/unit-images',
              group: 'Reports',
              icon: 'picture',
              allowedFor: ['ADMIN'],
            },
            {
              label: 'Placement Item History',
              link: '/placement-test-items-history',
              group: 'Reports',
              icon: 'info-circle-o',
              allowedFor: ['CONTENT_ADMIN', 'ADMIN'],
            },
            {
              label: 'Unit Items Errors',
              link: '/reports/unit-errors',
              group: 'Reports',
              icon: 'exclamation-circle-o',
              allowedFor: ['ADMIN', 'IMAGE_ADMIN'],
            },
            {
              label: 'Items By Words',
              link: '/items-by-words',
              group: 'Reports',
              icon: 'file-text',
              allowedFor: ['ADMIN'],
            },
            {
              label: 'Unit Items Execution Stats',
              link: '/unit-items-execution-stats',
              group: 'Reports',
              icon: 'warning',
              allowedFor: ['CONTENT_ADMIN', 'ADMIN'],
            },
            {
              label: 'Placement Test',
              link: '/placement-test',
              group: 'Tests',
              icon: 'solution',
            },
            {
              label: 'Practice Test',
              link: '/practice-test',
              group: 'Tests',
              icon: 'database',
            },
            {
              label: 'Certification Test',
              link: '/certification-test-register',
              group: 'Tests',
              icon: 'exception',
            },
          ]}
        />
        <SubMenu
          title="Academic"
          icon="folder-open"
          items={[
            {
              label: 'Achievements',
              link: '/student-achievements',
              icon: 'trophy',
            },
            {
              label: 'Certification Test',
              link: '/certification-test-executions',
              icon: 'contacts',
            },
            {
              label: 'Records',
              link: '/records/filters',
              icon: 'database',
            },
            {
              label: 'Student Placement/Mastery Tests',
              link: '/student-tests',
            },
          ]}
        />
        <SubMenu
          title="Ranking"
          icon="trophy"
          items={[
            {
              label: 'Students',
              icon: 'user',
              link: '/rankings',
            },
          ]}
        />
        <SubMenu
          title="Reports"
          icon="filter"
          allowedFor={['ADMIN', 'COMPANY_MANAGER', 'SCHOOL_MANAGER']}
          items={[
            {
              label: 'Usage Stats',
              icon: 'pie-chart',
              link: '/usage-stats',
            },
          ]}
        />
        <SubMenu
          title="Config"
          icon="setting"
          allowedFor={['SCHOOL_MANAGER', 'COMPANY_MANAGER', 'ADMIN', 'DISTRIBUTOR_MANAGER']}
          items={[
            {
              label: 'Emails',
              link: '/school-configuration/emails',
              icon: 'mail',
            },
            {
              label: 'Evaluation Periods',
              link: '/evaluation-templates',
              icon: 'calendar',
            },
            {
              label: 'Grades',
              link: '/school-configuration/grades',
              icon: 'table',
            },
          ]}
        />
      </Menu>
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
