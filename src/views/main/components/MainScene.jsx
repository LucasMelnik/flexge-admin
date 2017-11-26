import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Menu from '../../../core/layout/Menu';
import SubMenu from '../../../core/layout/SubMenu';
import ConfirmDialogContainer from './ConfirmDialogContainer';
import Button from '../../../core/form/Button';

const MainScene = props => (
  <Layout>
    <Layout.Header>
      <Menu>
        <SubMenu
          title="Admin"
          icon="user"
          allowedFor={['ADMIN']}
          groups={[
            {
              group: 'System Configuration',
            },
            {
              group: 'Admin Register',
            },
          ]}
          items={[
            {
              label: 'General Configuration',
              link: '/configuration',
              group: 'System Configuration',
              icon: 'tool',
            },
            {
              label: 'Achievements',
              link: '/achievements',
              group: 'System Configuration',
              icon: 'trophy',
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
            {
              label: 'Courses',
              link: '/courses',
              group: 'Admin Register',
              icon: 'book',
            },
            {
              label: 'Characters',
              link: '/characters',
              group: 'Admin Register',
              icon: 'user',
            },
            {
              label: 'Regions',
              link: '/regions',
              group: 'Admin Register',
              icon: 'compass',
            },
          ]}
        />
        <SubMenu
          title="Basic Register"
          icon="folder"
          allowedFor={['ADMIN']}
          groups={[
            {
              group: 'Organizations',
            },
            {
              group: 'Users',
            },
            {
              group: 'School Management',
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
              allowedFor: ['ADMIN', 'DISTRIBUTOR_MANAGER'],
              group: 'Organizations',
              icon: 'contacts',
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
              allowedFor: ['ADMIN', 'DISTRIBUTOR_MANAGER', 'COMPANY_MANAGER', 'SCHOOL_MANAGER'],
              group: 'Users',
            },
            {
              label: 'Grade Configuration',
              link: `/schools/${localStorage.id}/grade-config`,
              allowedFor: ['SCHOOL_MANAGER'],
              group: 'School Management',
            },
            {
              label: 'Evaluation Periods',
              link: `/schools/${localStorage.id}/evaluation-periods`,
              allowedFor: ['SCHOOL_MANAGER'],
              group: 'School Management',
            },
          ]}
        />
        <SubMenu
          title="Content"
          icon="book"
          allowedFor={['ADMIN', 'CONTENT_ADMIN', 'IMAGE_ADMIN']}
          groups={[
            {
              group: 'Content',
            },
            {
              group: 'Tests',
            },
            {
              group: 'Admin',
              allowedFor: ['ADMIN'],
            },
          ]}
          items={[
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
              label: 'Approved Images Records',
              link: '/records/unit-images',
              group: 'Admin',
              icon: 'picture',
              allowedFor: ['ADMIN'],
            },
            {
              label: 'Unit Items Errors',
              link: '/records/unit-errors',
              group: 'Admin',
              icon: 'exclamation-circle',
              allowedFor: ['ADMIN'],
            },
            {
              label: 'Audio',
              link: '/audio',
              group: 'Admin',
              icon: 'sound',
              allowedFor: ['AUDIO_CONTENT', 'ADMIN'],
            },
          ]}
        />
        <SubMenu
          title="Records"
          icon="folder-open"
          allowedFor={['ADMIN']}
          items={[
            {
              label: 'Placement Item History',
              link: '/placement-test-items-history',
            },
            {
              label: 'Student Placement/Mastery Tests',
              link: '/student-tests',
            },
            {
              label: 'Records',
              link: '/records/filters',
            },
            {
              label: 'Grades',
              link: '/grades',
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
