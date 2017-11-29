import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import colors from './colors';

const DoughnutChart = props => (
  <Doughnut
    data={{
      labels: props.labels,
      datasets: [{
        fill: true,
        backgroundColor: colors,
        data: props.data,
      }],
    }}
    options={{
      responsive: true,
      legend: {
        position: 'right',
      },
    }}
  />
);

DoughnutChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default DoughnutChart;
