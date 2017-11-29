import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import colors from './colors';

const LineChart = props => (
  <Line
    height={100}
    data={{
      labels: props.labels,
      datasets: props.dataFormat.map((format, index) => ({
        label: format.label,
        lineTension: 0.2,
        backgroundColor: colors[index],
        borderColor: colors[index],
        pointHoverRadius: 5,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        data: props.data.map(item => format.valueRender(item)),
      })),
    }}
    options={{
      responsive: true,
      scales: {
        yAxes: [{
          stacked: true,
        }],
      },
    }}
  />
);

LineChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dataFormat: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    label: PropTypes.string,
    valueRender: PropTypes.func,
  })).isRequired,
};

export default LineChart;
