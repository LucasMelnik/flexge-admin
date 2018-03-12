import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import findIndex from 'lodash/findIndex';
import Card from '../../../../../core/layout/Card';
import LineChart from '../../../../../core/chart/LineChart';

const WeeklyStudyQualityChart = props => (
  <Card
    title="Average Study Quality By Week"
    loading={props.loading}
  >
    <LineChart
      height={350}
      labels={props.data.map(charItem => moment(charItem.id, 'YYYY-MM-DD').format('MM/DD/YYYY'))}
      data={props.data}
      dataFormat={[
        {
          label: 'Study Quality',
          valueRender: item => item.averageScore ? item.averageScore.toFixed(1) : 0,
        },
      ]}
      yAxes={[{
        display: true,
        ticks: {
          min: -5,
          max: 15,
          stepSize: 5,
        },
      }]}
      tooltipsCallbacks={{
        label: (tooltipItem, data) => {
          const index = findIndex(data.labels, label => label === tooltipItem.xLabel);
          const studyQuality = data.datasets[tooltipItem.datasetIndex].data[index] || 0;
          return `${data.datasets[tooltipItem.datasetIndex].label}: ${studyQuality}`;
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
