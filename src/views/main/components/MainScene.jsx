import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TopBar from '../../../core/layout/TopBar';
import MainContent from '../../../core/layout/MainContent';
import Menu from '../../../core/layout/Menu';
import MenuItem from '../../../core/layout/MenuItem';
import PermissionValidator from '../../../core/layout/PermissionValidator';
import SubMenu from '../../../core/layout/SubMenu';
import ConfirmDialogContainer from './ConfirmDialogContainer';
import NotificationContainer from './NotificationContainer';

class MainScene extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    const $ = window.$;
    $('.page-topbar li.profile').addClass('showopacity');
  }

  render() {
    return (
      <div>
        <ConfirmDialogContainer />
        <TopBar />
        <Menu>
          <PermissionValidator allowedFor={['ADMIN']}>
            <MenuItem title="Admin" icon="fa fa-user">
              <SubMenu
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
                ]}
              />
            </MenuItem>
          </PermissionValidator>
          <PermissionValidator allowedFor={['ADMIN']}>
            <MenuItem title="Partners" icon="fa fa-users">
              <SubMenu
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
            </MenuItem>
          </PermissionValidator>
          <PermissionValidator allowedFor={['ADMIN', 'DISTRIBUTOR_MANAGER', 'COMPANY_MANAGER', 'SCHOOL_MANAGER']}>
            <MenuItem title="School" icon="fa fa-graduation-cap">
              <SubMenu
                items={[
                  {
                    label: 'Students',
                    link: '/students',
                  },
                ]}
              />
            </MenuItem>
          </PermissionValidator>
          <PermissionValidator allowedFor={['ADMIN']}>
            <MenuItem title="Users" icon="fa fa-user">
              <SubMenu
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
            </MenuItem>
          </PermissionValidator>
          <PermissionValidator allowedFor={['ADMIN', 'CONTENT_ADMIN', 'IMAGE_ADMIN']}>
            <MenuItem
              title="Modules"
              icon="fa fa-book"
              link="/modules"
            />
          </PermissionValidator>
          <PermissionValidator allowedFor={['ADMIN', 'CONTENT_ADMIN', 'IMAGE_ADMIN']}>
            <MenuItem
              title="Review"
              icon="fa fa-eye"
              link="/reviews"
            />
          </PermissionValidator>
          <PermissionValidator allowedFor={['ADMIN', 'CONTENT_ADMIN', 'IMAGE_ADMIN']}>
            <MenuItem
              title="Placement Test"
              icon="fa fa-pencil-square"
              link="/placement-test"
            />
          </PermissionValidator>
          <PermissionValidator allowedFor={['ADMIN', 'CONTENT_ADMIN', 'IMAGE_ADMIN']}>
            <MenuItem
              title="Practice Test"
              icon="fa fa-book"
              link="/practice-tests"
            />
          </PermissionValidator>
          <PermissionValidator allowedFor={['ADMIN']}>
            <MenuItem title="Reports" icon="fa fa-file-o">
              <SubMenu
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
                    link: '/records',
                  },
                  {
                    label: 'Grades',
                    link: '/grades',
                  },
                ]}
              />
            </MenuItem>
          </PermissionValidator>
        </Menu>
        <MainContent>
          {this.props.children}
        </MainContent>
        <NotificationContainer />
      </div>
    );
  }
}

export default MainScene;
