import React from 'react';
import Card from '../../../../core/layout/Card';
import BarChart from '../../../../core/chart/BarChart';

const SchoolClassProgressChart = () => (
  <Card
    title="Nível de Progresso por Classe"
  >
    <BarChart
      labels={['7A', '7B', '8A', '1A', '2A']}
      data={[0.7, 1.1, 0.9, 1.5, 1.7]}
    />
  </Card>
);

export default SchoolClassProgressChart;
