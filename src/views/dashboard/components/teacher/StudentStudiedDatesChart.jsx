import React from 'react';
import Card from '../../../../core/layout/Card';
import DoughnutChart from '../../../../core/chart/DoughnutChart';

const StudentStudiedDatesChart = () => (
  <Card
    title="Study Quality da suas turmas"
  >
    <DoughnutChart
      labels={[
        'Não estudou nas últimas 4 semanas',
        'Estudou nas últimas 4 semanas',
        'Estudou nas últimas 3 semanas',
        'estudou nas últimas 2 semanas',
        'estudou na última semana',
      ]}
      data={[5, 50, 57, 70, 80]}
    />
  </Card>
);

export default StudentStudiedDatesChart;
