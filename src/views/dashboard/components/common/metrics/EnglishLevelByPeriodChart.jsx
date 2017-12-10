import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';
import Card from '../../../../../core/layout/Card';
import LineChart from '../../../../../core/chart/LineChart';
import { englishLevelCourses } from '../../../../../core/consts';

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
            callback: (value, index) => englishLevelCourses[index].label,
          },
          afterBuildTicks: (scale) => {
            scale.ticks = englishLevelCourses.map(tick => tick.value);
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
