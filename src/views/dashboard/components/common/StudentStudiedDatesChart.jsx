import React from 'react';
import Card from '../../../../core/layout/Card';
import DoughnutChart from '../../../../core/chart/DoughnutChart';

const StudentStudiedDatesChart = () => (
  <Card
    title="Alunos estudando por semana"
  >
    <DoughnutChart
      labels={[
        '% sem estudo nas últimas 4 semanas',
        '% que estudaram nas últimas 4 semanas',
        '% que estudaram nas últimas 3 semanas',
        '% que estudaram nas últimas 2 semanas',
        '% que estudaram na última semana',
      ]}
      data={[5, 10, 25, 30, 30]}
    />
  </Card>
);

export default StudentStudiedDatesChart;
