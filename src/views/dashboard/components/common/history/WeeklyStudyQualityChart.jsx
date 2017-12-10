import React from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import findIndex from 'lodash/findIndex';
import moment from 'moment';
import Card from '../../../../../core/layout/Card';
import LineChart from '../../../../../core/chart/LineChart';
import { getLabel } from './utils';

const WeeklyStudyQualityChart = props => (
  <Card
    title="Average Study Quality By Week"
    loading={props.loading}
  >
    <LineChart
      height={350}
      labels={range(0, 52).map(week => getLabel(week))}
      data={range(1, 53).map(week => props.data.find(item => Number(item.id) === week) || {})}
      dataFormat={[
        {
          label: 'Study Quality',
          valueRender: item => item.averageScore || 0,
        },
      ]}
      yAxes={[{
        display: true,
        ticks: {
          min: -5,
          max: 15,
          stepSize: 3,
        },
      }]}
      tooltipsCallbacks={{
        label: (tooltipItem, data) => {
          const index = findIndex(data.labels, label => label === tooltipItem.xLabel);
          const studyQuality = data.datasets[tooltipItem.datasetIndex].data[index] || 0;
          return `${data.datasets[tooltipItem.datasetIndex].label}: ${Number(studyQuality).toFixed(2)}`;
        },
      }}
    />
  </Card>
);

WeeklyStudyQualityChart.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array,
};

WeeklyStudyQualityChart.defaultProps = {
  data: [],
};

export default WeeklyStudyQualityChart;
