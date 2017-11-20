import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Menu from '../../../core/layout/Menu';
import MenuItem from '../../../core/layout/MenuItem';
import SubMenu from '../../../core/layout/SubMenu';
import ConfirmDialogContainer from './ConfirmDialogContainer';
import NotificationContainer from './NotificationContainer';

const MainScene = props => (
  <Layout>
    <Layout.Header>
      <Menu>
        <SubMenu
          title="Admin"
          icon="fa fa-user"
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
          icon="fa fa-users"
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
          icon="fa fa-user"
          allowedFor={['ADMIN']}
          items={[
            {
              label: 'Company Users',
              link: '/users',
            },
            {
              label: 'Admin Users',
              link: '/admin-users',
            },
            {
              label: 'Distributor Users',
              link: '/distributor-users',
            },
          ]}
        />
        <SubMenu
          title="School"
          icon="fa fa-graduation-cap"
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
          icon="fa fa-book"
          link="/modules"
          allowedFor={['ADMIN', 'CONTENT_ADMIN', 'IMAGE_ADMIN']}
        />
        <MenuItem
          title="Review"
          icon="fa fa-eye"
          link="/reviews"
          allowedFor={['ADMIN', 'CONTENT_ADMIN', 'IMAGE_ADMIN']}
        />
        <MenuItem
          title="Placement Test"
          icon="fa fa-pencil-square"
          link="/placement-test"
          allowedFor={['ADMIN', 'CONTENT_ADMIN', 'IMAGE_ADMIN']}
        />
        <MenuItem
          title="Practice Test"
          icon="fa fa-book"
          link="/practice-tests"
          allowedFor={['ADMIN', 'CONTENT_ADMIN', 'IMAGE_ADMIN']}
        />
        <SubMenu
          title="Reports"
          icon="fa fa-file-o"
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
              link: '/records/schools',
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
          icon="fa fa-file-o"
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
        height: '100vh',
      }}
    >
      {props.children}
      <ConfirmDialogContainer />
      <NotificationContainer />
    </Layout.Content>
  </Layout>
);

MainScene.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainScene;
