import React from 'react';
import Card from '../../../../core/layout/Card';
import DoughnutChart from '../../../../core/chart/DoughnutChart';
import { ORANGE, RED, GREEN, DARK_GREEN } from '../../../../core/chart/colors';

const StudentStudyQualityChart = () => (
  <Card
    title="Percentual de Study Quality dos Alunos"
  >
    <DoughnutChart
      labels={['% de SQ entre -5 e 0', '% de SQ entre 0 a 5', '% de SQ entre 5 a 10', '% de SQ acima de 10']}
      data={[10, 20, 50, 20]}
      colors={[RED, ORANGE, GREEN, DARK_GREEN]}
    />
  </Card>
);

export default StudentStudyQualityChart;
