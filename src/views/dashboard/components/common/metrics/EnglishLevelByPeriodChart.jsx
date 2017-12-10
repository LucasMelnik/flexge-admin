import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';
import Card from '../../../../../core/layout/Card';
import LineChart from '../../../../../core/chart/LineChart';

const ticks = [
  { value: 0, label: 'Initial' },
  { value: 0.5, label: 'Pre A1' },
  { value: 1.0, label: 'A1' },
  { value: 1.5, label: 'A1+' },
  { value: 2.0, label: 'A2' },
  { value: 2.5, label: 'A2+' },
  { value: 3.0, label: 'B1' },
  { value: 3.5, label: 'B1+' },
  { value: 4, label: 'B2' },
  { value: 4.5, label: 'B2+' },
  { value: 5, label: 'C1' },
  { value: 6, label: 'C2' },
];

const EnglishLevelByPeriodChart = props => (
  <Card
    title="Progress Over Time"
    loading={props.loading}
  >
    <LineChart
      height={250}
      labels={props.data.map(data => (
        `${moment.duration(data.months - 6, 'months').format()} ~ ${moment.duration(data.months, 'months').format()}`
      ))}
      data={props.data}
      dataFormat={[
        {
          label: 'Average English Level',
          valueRender: item => item.averageEnglishLevel,
        },
      ]}
      yAxes={[
        {
          ticks: {
            autoSkip: false,
            min: 0,
            max: 6,
            callback: (value, index) => ticks[index].label,
          },
          afterBuildTicks: (scale) => {
            scale.ticks = ticks.map(tick => tick.value);
            return;
          },
        },
      ]}
      tooltipsCallbacks={{
        label: (tooltipItem, data) => {
          const level = data.datasets[0].data[tooltipItem.index] || 0;
          return `Level: ${level.toFixed(2)}`;
        },
      }}
    />
  </Card>
);
EnglishLevelByPeriodChart.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
};

export default EnglishLevelByPeriodChart;
