import React from 'react';
import PropTypes from 'prop-types';
import TopBar from '../../../core/layout/TopBar';
import LeftSidebar from '../../../core/layout/LeftSidebar';
import MainContent from '../../../core/layout/MainContent';
import Menu from '../../../core/layout/Menu';
import MenuItem from '../../../core/layout/MenuItem';
import PermissionValidator from '../../../core/layout/PermissionValidator';
import MenuSection from '../../../core/layout/MenuSection';
import SubMenu from '../../../core/layout/SubMenu';
import ConfirmDialogContainer from './ConfirmDialogContainer';
import NotificationContainer from './NotificationContainer';

const MainScene = props => (
  <div>
    <ConfirmDialogContainer />
    <TopBar />
    <LeftSidebar>
      <Menu>
        <PermissionValidator allowedFor={['ADMIN', 'DISTRIBUTOR_MANAGER', 'COMPANY_MANAGER', 'SCHOOL_MANAGER']}>
          <MenuSection>
            Cadastros
          </MenuSection>
        </PermissionValidator>
        <PermissionValidator allowedFor={['ADMIN']}>
          <MenuItem title="Admin" icon="fa fa-user">
            <SubMenu
              items={[
                {
                  label: 'General Configuration',
                  link: '/configs',
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
                  label: 'Classes',
                  link: '/classes',
                },
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
        <PermissionValidator allowedFor={['ADMIN', 'CONTENT_ADMIN']}>
          <div>
            <MenuSection>
              Conteúdo
            </MenuSection>
            <PermissionValidator allowedFor={['ADMIN', 'CONTENT_ADMIN']}>
              <MenuItem
                title="Modules"
                icon="fa fa-book"
                link="/modules"
              />
            </PermissionValidator>
            <PermissionValidator allowedFor={['ADMIN', 'CONTENT_ADMIN']}>
              <MenuItem
                title="Review"
                icon="fa fa-eye"
                link="/reviews"
              />
            </PermissionValidator>
            <PermissionValidator allowedFor={['ADMIN', 'CONTENT_ADMIN']}>
              <MenuItem
                title="Placement Test"
                icon="fa fa-pencil-square"
                link="/placement-test"
              />
            </PermissionValidator>
          </div>
        </PermissionValidator>
        <PermissionValidator allowedFor={['ADMIN', 'CONTENT_ADMIN']}>
          <div>
            <MenuSection>
              Academic
            </MenuSection>
            <PermissionValidator allowedFor={['ADMIN', 'CONTENT_ADMIN']}>
              <MenuItem
                title="Reports"
                icon="fa fa-book"
                link="/reports"
              />
            </PermissionValidator>
            <PermissionValidator allowedFor={['ADMIN', 'CONTENT_ADMIN']}>
              <MenuItem title="Records" icon="fa fa-book">
                <SubMenu
                  items={[
                    {
                      label: 'Classes',
                      link: '/classes-academic',
                    },
                    {
                      label: 'Students',
                      link: '/students-academic',
                    },
                  ]}
                />
              </MenuItem>
            </PermissionValidator>
            <PermissionValidator allowedFor={['ADMIN', 'CONTENT_ADMIN']}>
              <MenuItem
                title="Grades"
                icon="fa fa-book"
                link="/grades"
              />
            </PermissionValidator>
          </div>
        </PermissionValidator>
      </Menu>
    </LeftSidebar>
    <MainContent>
      {props.children}
    </MainContent>
    <NotificationContainer />
  </div>
);

MainScene.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainScene;
