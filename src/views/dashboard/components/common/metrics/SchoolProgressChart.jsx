import React from 'react';
import Card from '../../../../../core/layout/Card';
import BarChart from '../../../../../core/chart/BarChart';

const SchoolProgressChart = () => (
  <Card
    title="Nível de Progresso por Colégio"
  >
    <BarChart
      labels={['Foz Centro', 'Foz Vila A', 'Curitiba Batel', 'Curitiba Jd. Americas']}
      data={[0.9, 1.1, 0.9, 1.5]}
      options={{
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              min: 0,
            },
          }],
        },
      }}
    />
  </Card>
);

export default SchoolProgressChart;
