import React from 'react';
import range from 'lodash/range';
import Card from '../../../../core/layout/Card';
import LineChart from '../../../../core/chart/LineChart';

const WeeklyStudyQualityChart = () => (
  <Card title="Média de Study Quality por Semana">
    <LineChart
      labels={range(1, 46).map(value => `W${value}`)}
      data={range(1, 46).map(() => Math.random() * (7 - (-3)) + (-3))}
      dataFormat={[
        {
          label: 'Score',
          valueRender: item => item,
        },
      ]}
    />
  </Card>
);

export default WeeklyStudyQualityChart;
