import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = props => (
  <Doughnut
    data={{
      labels: props.labels,
      datasets: [{
        fill: true,
        backgroundColor: props.data.map(() => `#${(0x1000000 + ((Math.random()) * 0xffffff)).toString(16).substr(1,6)}`),
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
