import React from 'react';
import Card from '../../../../core/layout/Card';
import Table from '../../../../core/form/Table';
import DoughnutChart from '../../../../core/chart/DoughnutChart';
import Separator from '../../../../core/layout/Separator';

const StudentStudiedTimeChart = () => (
  <Card
    title="Tempo de estudo de seus alunos"
  >
    <DoughnutChart
      labels={['Não estudou', 'até 1h de estudo', 'até 2h de estudo', 'mais de 2h']}
      data={[10, 20, 50, 20]}
    />
    <Separator />
    <Table
      columns={[
        {
          label: 'Student',
          path: 'name',
        },
        {
          label: 'Class',
          path: 'schoolClass',
        },
        {
          label: 'Studied Time',
          path: 'studiedTime',
        },
      ]}
      rows={[
        { name: 'Juciel de Freitas', schoolClass: '3 A', studiedTime: '05:43' },
        { name: 'Vivian Daniela', schoolClass: '3 A', studiedTime: '05:12' },
        { name: 'Filipe Colpo', schoolClass: '3 A', studiedTime: '04:57' },
        { name: 'Rafael Arenas', schoolClass: '3 A', studiedTime: '04:24' },
        { name: 'Débora Vargas', schoolClass: '3 A', studiedTime: '04:13' },
      ]}
    />
  </Card>
);

export default StudentStudiedTimeChart;
