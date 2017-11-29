import React from 'react';
import Card from '../../../../core/layout/Card';
import BarChart from '../../../../core/chart/BarChart';

const SchoolStudyQualityChart = () => (
  <Card
    title="Study Quality da suas turmas"
  >
    <BarChart
      labels={['Foz Centro', 'Foz Vila A', 'Curitiba Batel', 'Curitiba Jd. Americas']}
      data={[-1, 5, 5, 7]}
      options={{
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              min: -5,
              max: 15,
            },
          }],
        },
      }}
    />
  </Card>
);

export default SchoolStudyQualityChart;
