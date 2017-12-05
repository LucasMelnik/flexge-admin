import React from 'react';
import Card from '../../../../core/layout/Card';
import BarChart from '../../../../core/chart/BarChart';
import { GREEN, ORANGE, RED } from '../../../../core/chart/colors';

const SchoolClassStudyQualityChart = () => (
  <Card
    title="Study Quality da suas turmas"
  >
    <BarChart
      labels={['7A', '7B', '8A', '8B']}
      data={[-5, 5, 11.3, 14.7]}
      colors={[RED, ORANGE, GREEN, GREEN]}
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

export default SchoolClassStudyQualityChart;
