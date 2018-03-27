import React from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import findIndex from 'lodash/findIndex';
import moment from 'moment';
import 'moment-duration-format';
import Card from '../../../../../core/layout/Card';
import BarChart from '../../../../../core/chart/BarChart';
import { getLabel } from './utils';

const WeeklyStudyTimeChart = props => (
  <Card
    title="Time Studied By Week"
    loading={props.loading}
  >
    <BarChart
      height={350}
      labels={range(1, moment().add(1, 'week').format('WW')).map(week => getLabel(week))}
      data={range(1, moment().add(1, 'week').format('WW')).map(week => props.data.find(item => item.week === week) || {})}
      dataFormat={[
        {
          label: 'Total Hours',
          valueRender: item => item.totalStudiedTime || 0,
          yAxisID: 'total-hours',
          type: 'bar',
        },
        {
          label: 'Average Hours',
          valueRender: item => item.averageStudiedTime || 0,
          yAxisID: 'average-hours',
          fill: false,
          type: 'line',
        },
      ]}
      options={{
        scales: {
          yAxes: [
            {
              type: 'linear',
              display: 'true',
              position: 'left',
              id: 'average-hours',
              ticks: {
                callback: label => (
                  moment.duration(label, 'hours').format('hh:mm', { trim: false })
                ),
              },
              scaleLabel: {
                display: 'true',
                labelString: 'Average Hours',
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
              scaleLabel: {
                display: 'true',
                labelString: 'Total Hours',
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                autoSkip: false,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            beforeBody: (data) => {
              const item = props.data.find(entry => entry.week === data[0].index + 1);
              return `Total students: ${item ? item.totalStudyingStudents : 0}`;
            },
            label: (tooltipItem, data) => {
              const index = findIndex(data.labels, label => label === tooltipItem.xLabel);
              const hours = data.datasets[tooltipItem.datasetIndex].data[index] || 0;
              return `${data.datasets[tooltipItem.datasetIndex].label}: ${moment.duration(hours, 'hours').format('hh:mm', { trim: false })}`;
            },
          },
        },
        legend: {
          display: true,
          onClick: () => true,
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
