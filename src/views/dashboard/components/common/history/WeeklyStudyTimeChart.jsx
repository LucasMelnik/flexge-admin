import React from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import findIndex from 'lodash/findIndex';
import moment from 'moment';
import 'moment-duration-format';
import Card from '../../../../../core/layout/Card';
import LineChart from '../../../../../core/chart/LineChart';
import { getLabel } from './utils';

const WeeklyStudyTimeChart = props => (
  <Card
    title="Time Studied By Week"
    loading={props.loading}
  >
    <LineChart
      height={350}
      labels={range(0, 52).map(week => getLabel(week))}
      data={range(1, 53).map(week => props.data.find(item => item.week === week) || {})}
      dataFormat={[
        {
          label: 'Average Hours',
          valueRender: item => item.averageStudiedTime || 0,
          yAxisID: 'average-hours',
        },
        {
          label: 'Total Hours',
          valueRender: item => item.totalStudiedTime || 0,
          yAxisID: 'total-hours',
        },
      ]}
      yAxes={[
        {
          type: 'linear',
          display: 'true',
          position: 'left',
          id: 'average-hours',
          ticks: {
            callback: (label) => (
              moment.duration(label, 'hours').format('hh:mm', { trim: false })
            )
          },
        },
        {
          type: 'linear',
          display: 'true',
          position: 'right',
          id: 'total-hours',
          ticks: {
            callback: label => (
              moment.duration(label, 'hours').format('hh:mm', { trim: false })
            ),
          },
          gridLines: {
            drawOnChartArea: false,
          },
        },
      ]}
      tooltipsCallbacks={{
        beforeBody: (data) => {
          const item = props.data.find(entry => entry.week === data[0].index + 1);
          return `Total students: ${item ? item.totalStudyingStudents : 0}`;
        },
        label: (tooltipItem, data) => {
          const index = findIndex(data.labels, label => label === tooltipItem.xLabel);
          const hours = data.datasets[tooltipItem.datasetIndex].data[index] || 0;
          return `${data.datasets[tooltipItem.datasetIndex].label}: ${moment.duration(hours, 'hours').format('hh:mm', { trim: false })}`;
        },
      }}
    />
  </Card>
);

WeeklyStudyTimeChart.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array,
};

WeeklyStudyTimeChart.defaultProps = {
  data: [],
};

export default WeeklyStudyTimeChart;
