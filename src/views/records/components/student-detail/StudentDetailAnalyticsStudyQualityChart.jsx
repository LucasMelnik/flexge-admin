import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import findIndex from 'lodash/findIndex';
import Async from '../../../../core/layout/Async';
import LineChart from '../../../../core/chart/LineChart';

const StudentDetailAnalyticsStudyQualityChart = props => (
  <Async fetching={props.loading}>
    <LineChart
      height={350}
      labels={props.data.map(charItem => moment(charItem.id, 'YYYY-MM-DD').format('DD/MM/YYYY'))}
      data={props.data}
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
          stepSize: 5,
        },
      }]}
      tooltipsCallbacks={{
        label: (tooltipItem, data) => {
          const index = findIndex(data.labels, label => label === tooltipItem.xLabel);
          const studyQuality = data.datasets[tooltipItem.datasetIndex].data[index] || 0;
          return `${data.datasets[tooltipItem.datasetIndex].label}: ${Number(studyQuality).toFixed(1)}`;
        },
      }}
    />
  </Async>
);

StudentDetailAnalyticsStudyQualityChart.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array,
};

StudentDetailAnalyticsStudyQualityChart.defaultProps = {
  data: [],
};

export default StudentDetailAnalyticsStudyQualityChart;
