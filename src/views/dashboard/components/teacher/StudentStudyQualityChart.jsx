import React from 'react';
import Card from '../../../../core/layout/Card';
import DoughnutChart from '../../../../core/chart/DoughnutChart';

const StudentStudyQualityChart = () => (
  <Card
    title="Percentual de Study Quality dos Alunos"
  >
    <DoughnutChart
      labels={['-5 a 0', '0 a 5', '5 a 10', 'acima de 10']}
      data={[10, 20, 50, 20]}
    />
  </Card>
);

export default StudentStudyQualityChart;
