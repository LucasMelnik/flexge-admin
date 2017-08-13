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
        <MenuSection>
          Cadastros
        </MenuSection>
        <PermissionValidator allowedFor={['ADMIN']}>
          <MenuItem title="Admin" icon="fa fa-user">
            <SubMenu
              items={[
                {
                  label: 'Distributors',
                  link: '/v2/distributors',
                },
                {
                  label: 'General Configuration',
                  link: '/v2/configs',
                },
              ]}
            />
          </MenuItem>
        </PermissionValidator>
        <PermissionValidator allowedFor={['ADMIN']}>
          <MenuItem title="Distributor" icon="fa fa-users">
            <SubMenu
              items={[
                {
                  label: 'Distributors',
                  link: '/v2/distributors',
                },
              ]}
            />
          </MenuItem>
        </PermissionValidator>
        <PermissionValidator allowedFor={['ADMIN', 'DISTRIBUTOR_MANAGER']}>
          <MenuItem title="Company" icon="fa fa-building">
            <SubMenu
              items={[
                {
                  label: 'Companies',
                  link: '/v2/companies',
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
                  label: 'Schools',
                  link: '/v2/schools',
                },
                {
                  label: 'Classes',
                  link: '/v2/classes',
                },
                {
                  label: 'Teachers',
                  link: '/v2/teachers',
                },
                {
                  label: 'Students',
                  link: '/v2/students',
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
              <MenuItem title="Course" icon="fa fa-book">
                <SubMenu
                  items={[
                    {
                      label: 'Modules',
                      link: '/v2/modules',
                    },
                    {
                      label: 'Units',
                      link: '/v2/units',
                    },
                    {
                      label: 'Items',
                      link: '/v2/items',
                    },
                  ]}
                />
              </MenuItem>
            </PermissionValidator>
            <PermissionValidator allowedFor={['ADMIN', 'CONTENT_ADMIN']}>
              <MenuItem
                title="Review"
                icon="fa fa-eye"
                link="/v2/reviews"
              />
            </PermissionValidator>
            <PermissionValidator allowedFor={['ADMIN', 'CONTENT_ADMIN']}>
              <MenuItem
                title="Placement Test"
                icon="fa fa-pencil-square"
                link="/v2/placement-test"
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
