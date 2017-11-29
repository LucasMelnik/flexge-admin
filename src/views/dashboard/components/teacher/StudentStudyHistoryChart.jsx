import React from 'react';
import range from 'lodash/range';
import Card from '../../../../core/layout/Card';
import LineChart from '../../../../core/chart/LineChart';

const StudentStudyHistoryChart = () => (
  <Card title="Alunos da Instituição">
    <LineChart
      labels={range(1, 46).map(value => `W${value}`)}
      data={[
        { total: 10, study: 5 },
        { total: 15, study: 3 },
        { total: 50, study: 12 },
        { total: 60, study: 33 },
        { total: 60, study: 35 },
        { total: 65, study: 45 },
        { total: 40, study: 40 },
        { total: 40, study: 38 },
        { total: 50, study: 27 },
        { total: 10, study: 5 },
        { total: 15, study: 3 },
        { total: 10, study: 5 },
        { total: 15, study: 3 },
        { total: 50, study: 12 },
        { total: 60, study: 33 },
        { total: 60, study: 35 },
        { total: 65, study: 45 },
        { total: 40, study: 40 },
        { total: 40, study: 38 },
        { total: 50, study: 27 },
        { total: 10, study: 5 },
        { total: 15, study: 3 },
        { total: 10, study: 5 },
        { total: 15, study: 3 },
        { total: 50, study: 12 },
        { total: 60, study: 33 },
        { total: 60, study: 35 },
        { total: 65, study: 45 },
        { total: 40, study: 40 },
        { total: 40, study: 38 },
        { total: 50, study: 27 },
        { total: 10, study: 5 },
        { total: 15, study: 3 },
        { total: 10, study: 5 },
        { total: 15, study: 3 },
        { total: 50, study: 12 },
        { total: 60, study: 33 },
        { total: 60, study: 35 },
        { total: 65, study: 45 },
        { total: 40, study: 40 },
        { total: 40, study: 38 },
        { total: 50, study: 27 },
        { total: 10, study: 5 },
        { total: 15, study: 7 },
        { total: 15, study: 3 },
      ]}
      dataFormat={[
        {
          label: 'Alunos estudando',
          color: `#${(0x1000000 + ((Math.random()) * 0xffffff)).toString(16).substr(1,6)}`,
          valueRender: item => item.study,
        },
        {
          label: 'Total de alunos',
          color: `#${(0x1000000 + ((Math.random()) * 0xffffff)).toString(16).substr(1,6)}`,
          valueRender: item => item.total,
        },
      ]}
    />
  </Card>
);

export default StudentStudyHistoryChart;
