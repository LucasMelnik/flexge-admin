import React from 'react';
import range from 'lodash/range';
import Card from '../../../../core/layout/Card';
import LineChart from '../../../../core/chart/LineChart';

const StudentAverageStudiedTimeChart = () => (
  <Card title="Média de horas de estudo">
    <LineChart
      labels={range(1, 46).map(value => `W${value}`)}
      data={range(1, 46).map(() => Math.random() * (5 - 3) + 3)}
      dataFormat={[
        {
          label: 'Horas de estudo',
          color: `#${(0x1000000 + ((Math.random()) * 0xffffff)).toString(16).substr(1,6)}`,
          valueRender: item => item,
        },
      ]}
    />
  </Card>
);

export default StudentAverageStudiedTimeChart;
