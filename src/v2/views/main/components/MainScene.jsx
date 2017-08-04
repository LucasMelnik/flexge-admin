import React from 'react';
import PropTypes from 'prop-types';
import TopBar from '../../../core/layout/TopBar';
import LeftSidebar from '../../../core/layout/LeftSidebar';
import MainContent from '../../../core/layout/MainContent';
import Menu from '../../../core/layout/Menu';
import MenuItem from '../../../core/layout/MenuItem';
import MenuSection from '../../../core/layout/MenuSection';
import SubMenu from '../../../core/layout/SubMenu';

const MainScene = props => (
  <div>
    <TopBar />
    <LeftSidebar>
      <Menu>
        <MenuSection>
          Cadastros
        </MenuSection>
        <MenuItem title="School" icon="fa fa-user">
          <SubMenu
            items={[
              {
                label: 'Schools',
              },
              {
                label: 'Classes',
              },
              {
                label: 'Teachers',
              },
              {
                label: 'Students',
              },
            ]}
          />
        </MenuItem>
        <MenuItem title="Company" icon="fa fa-user">
          <SubMenu
            items={[
              {
                label: 'Companies',
              },
              {
                label: 'Company Managers',
              },
            ]}
          />
        </MenuItem>
        <MenuItem title="Admin" icon="fa fa-user">
          <SubMenu
            items={[
              {
                label: 'Distributors',
              },
              {
                label: 'General Configuration',
              },
            ]}
          />
        </MenuItem>
        <MenuSection>
          Conteúdo
        </MenuSection>
        <MenuItem title="Course" icon="fa fa-user">
          <SubMenu
            items={[
              {
                label: 'Courses',
              },
              {
                label: 'Modules',
              },
              {
                label: 'Units',
              },
              {
                label: 'Items',
              },
            ]}
          />
        </MenuItem>
        <MenuItem title="Review" icon="fa fa-user" />
        <MenuItem title="Placement Test" icon="fa fa-user" />
      </Menu>
    </LeftSidebar>
    <MainContent>
      {props.children}
    </MainContent>
  </div>
);

MainScene.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainScene;
