import React from 'react';
import TopBar from './core/layout/TopBar';
import LeftSidebar from './core/layout/LeftSidebar';
import MainContent from './core/layout/MainContent';
import Card from './core/layout/Card';
import TextInput from './core/form/TextInput';
import Table from './core/form/Table';

const TestComponents = () => (
  <div>
    <Card title="TITULO DO CARD">
      <TextInput
        label="Name"
        description="Descricao"
        type="password"
        placeholder="Digite o nome"
        isTextArea
        helpText="Teste teste teste"
      />
      
      <Table
        columns={[
          {
            label: 'Label',
            path: 'label',
          },
          {
            label: 'Order',
            path: 'order',
          },
          {
            label: 'Name',
            path: 'name',
          },
        ]}
        rows={[
          {
            name: 'teste',
            order: 'order teste',
            label: 'label teste',
          },
          {
            name: 'teste2',
            order: 'order teste',
            label: 'label teste',
          },
          {
            name: 'teste3',
            order: 'order teste',
            label: 'label teste',
          },
          {
            name: 'teste3',
            order: 'order teste',
            label: 'label teste',
          },
          {
            name: 'teste3',
            order: 'order teste',
            label: 'label teste',
          },
          {
            name: 'teste3',
            order: 'order teste',
            label: 'label teste',
          },
          {
            name: 'teste3',
            order: 'order teste',
            label: 'label teste',
          },
          {
            name: 'teste3',
            order: 'order teste',
            label: 'label teste',
          },
        ]}
      />
    </Card>
  </div>
);

export default TestComponents;
