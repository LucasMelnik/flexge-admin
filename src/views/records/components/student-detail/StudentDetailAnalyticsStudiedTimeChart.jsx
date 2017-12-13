import React from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import moment from 'moment/moment';
import { getLabel } from '../../../dashboard/components/common/history/utils';
import findIndex from 'lodash/findIndex';
import Async from '../../../../core/layout/Async';
import LineChart from '../../../../core/chart/LineChart';

const StudentDetailAnalyticsStudiedTimeChart = props => (
  <Async fetching={props.loading}>
    <LineChart
      height={350}
      labels={range(0, 52).map(week => getLabel(week))}
      data={range(1, 53).map(week => props.data.find(item => item.week === week) || {})}
      dataFormat={[
        {
          label: 'Total Hours',
          valueRender: item => item.totalStudiedTime || 0,
        },
      ]}
      yAxes={[
        {
          type: 'linear',
          display: 'true',
          ticks: {
            callback: label => (
              moment.duration(label, 'hours').format('hh:mm', { trim: false })
            ),
          },
          gridLines: {
            drawOnChartArea: true,
          },
        },
      ]}
      tooltipsCallbacks={{
        label: (tooltipItem, data) => {
          const index = findIndex(data.labels, label => label === tooltipItem.xLabel);
          const hours = data.datasets[tooltipItem.datasetIndex].data[index] || 0;
          return `${data.datasets[tooltipItem.datasetIndex].label}: ${moment.duration(hours, 'hours').format('hh:mm', { trim: false })}`;
        },
      }}
    />
  </Async>
);

StudentDetailAnalyticsStudiedTimeChart.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array,
};

StudentDetailAnalyticsStudiedTimeChart.defaultProps = {
  data: [],
};

export default StudentDetailAnalyticsStudiedTimeChart;
