import React from 'react';
import TopBar from '../../core/layout/TopBar';
import LeftSidebar from '../../core/layout/v2/LeftSidebar';
import MainContent from '../../core/layout/v2/MainContent';
import Button from '../../core/form/v2/Button';
import IconButton from '../../core/form/v2/IconButton';
import Dropdown from '../../core/form/v2/Dropdown';

const MainSceneV2 = () => (
  <div>
    <TopBar />
    <LeftSidebar />
    <MainContent>
      <Button
        label="Test"
      />
      <IconButton
        icon="fa fa-user"
      />
      <Dropdown
        label="Teste"
        items={[
          {
            label: 'Teste',
            onClick: () => alert('test'),
          },
        ]}
      />
    </MainContent>
  </div>
);

export default MainSceneV2;
