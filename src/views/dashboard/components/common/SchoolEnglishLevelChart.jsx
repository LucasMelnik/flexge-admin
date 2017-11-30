import React from 'react';
import Card from '../../../../core/layout/Card';
import BarChart from '../../../../core/chart/BarChart';

const SchoolEnglishLevelChart = () => (
  <Card
    title="Nível de Inglês"
  >
    <BarChart
      labels={['< 6 m', 'entre 6 m - 1 ano', '1 ano - 2 anos', '2 anos - 3 anos', '> 3 anos']}
      data={[0.7, 1.3, 2.1, 3.5, 4]}
    />
  </Card>
);

export default SchoolEnglishLevelChart;
