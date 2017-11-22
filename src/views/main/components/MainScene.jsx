import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Menu from '../../../core/layout/Menu';
import MenuItem from '../../../core/layout/MenuItem';
import SubMenu from '../../../core/layout/SubMenu';
import ConfirmDialogContainer from './ConfirmDialogContainer';

const MainScene = props => (
  <Layout>
    <Layout.Header>
      <Menu>
        <SubMenu
          title="Admin"
          icon="user"
          allowedFor={['ADMIN']}
          items={[
            {
              label: 'General Configuration',
              link: '/configuration',
            },
            {
              label: 'Item types',
              link: '/item-types',
            },
            {
              label: 'Placement test level',
              link: '/placement-test-levels',
            },
            {
              label: 'Courses',
              link: '/courses',
            },
            {
              label: 'Characters',
              link: '/characters',
            },
            {
              label: 'Regions',
              link: '/regions',
            },
            {
              label: 'Achievements',
              link: '/achievements',
            },
          ]}
        />
        <SubMenu
          title="Partners"
          icon="team"
          allowedFor={['ADMIN']}
          items={[
            {
              label: 'Distributors',
              link: '/distributors',
            },
            {
              label: 'Companies',
              link: '/companies',
            },
            {
              label: 'Schools',
              link: '/schools',
            },
          ]}
        />
        <SubMenu
          title="Users"
          icon="usergroup-add"
          allowedFor={['ADMIN']}
          items={[
            {
              label: 'Admin Users',
              link: '/admin-users',
            },
            {
              label: 'Distributor Users',
              link: '/distributor-users',
            },
            {
              label: 'Company Users',
              link: '/users',
            },
          ]}
        />
        <SubMenu
          title="School"
          icon="idcard"
          allowedFor={['ADMIN', 'DISTRIBUTOR_MANAGER', 'COMPANY_MANAGER', 'SCHOOL_MANAGER']}
          items={[
            {
              label: 'Students',
              link: '/students',
            },
          ]}
        />
        <MenuItem
          title="Modules"
          icon="book"
          link="/modules"
          allowedFor={['ADMIN', 'CONTENT_ADMIN', 'IMAGE_ADMIN']}
        />
        <MenuItem
          title="Review"
          icon="eye-o"
          link="/reviews"
          allowedFor={['ADMIN', 'CONTENT_ADMIN', 'IMAGE_ADMIN']}
        />
        <MenuItem
          title="Placement Test"
          icon="solution"
          link="/placement-test"
          allowedFor={['ADMIN', 'CONTENT_ADMIN', 'IMAGE_ADMIN']}
        />
        <MenuItem
          title="Practice Test"
          icon="database"
          link="/practice-tests"
          allowedFor={['ADMIN', 'CONTENT_ADMIN', 'IMAGE_ADMIN']}
        />
        <SubMenu
          title="Reports"
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
              label: 'Approved Images Records',
              link: '/records/unit-images',
            },
            {
              label: 'Unit Items Errors',
              link: '/records/unit-errors',
            },
            {
              label: 'Grades',
              link: '/grades',
            },
          ]}
        />
        <SubMenu
          title="Audio"
          icon="sound"
          allowedFor={['AUDIO_CONTENT', 'ADMIN']}
          items={[
            {
              label: 'Upload Management',
              link: '/item-audios',
            },
          ]}
        />
      </Menu>
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
