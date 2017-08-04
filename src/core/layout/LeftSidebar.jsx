import React from 'react';
import Menu from '../layout/Menu';
import MenuItem from '../layout/MenuItem';
import MenuSection from '../layout/MenuSection';
import SubMenu from '../layout/SubMenu';

const LeftSidebar = () => (
  <div className="page-container row-fluid">
    <div className="page-sidebar ">
      <div className="page-sidebar-wrapper" id="main-menu-wrapper">
        <div className="profile-info row">
            ...
        </div>
        <Menu>
          <MenuSection>
            Cadastros
          </MenuSection>
          <MenuItem title="School" icon="fa fa-user">
            <SubMenu
              items={[
                {
                  label: 'Classes',
                },
              ]}
            />
          </MenuItem>
          <MenuItem title="Company" icon="fa fa-user">
            <SubMenu
              items={[
                {
                  label: 'Managers',
                },
              ]}
            />
          </MenuItem>
        </Menu>
      </div>
      <div className="project-info">
        <div className="block1">
            ...
        </div>
        <div className="block2">
            ...
        </div>
      </div>
    </div>
  </div>
);

export default LeftSidebar;
