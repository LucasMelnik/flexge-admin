import React from 'react';
import Card from '../../../../core/layout/Card';
import LineChart from '../../../../core/chart/LineChart';

const SchoolEnglishLevelChart = () => (
  <Card
    title="Nível de Inglês"
  >
    <LineChart
      labels={[
        '< 6 months',
        '6m ~ 1y',
        '1y6m ~ 2y',
        '2y ~ 2y6m',
        '2y6m ~ 3y',
        '3y ~ 3y6m',
        '3y6m ~ 4y',
        '4y ~ 4y6m',
        '4y6m ~ 5y',
      ]}
      xAxesLabelString="Time"
      yAxesLabelString="Courses"
      data={[
        0,
        1,
        1.5,
        2,
        2.5,
        3,
        3.5,
        4,
        4.5,
        5,
        5.5,
        6
      ]}
      dataFormat={[
        {
          label: 'Nível de inglês',
          valueRender: item => item,
        },
      ]}
    />
  </Card>
);

export default SchoolEnglishLevelChart;
