import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = props => (
  <Doughnut
    data={{
      labels: props.labels,
      datasets: [{
        fill: true,
        backgroundColor: props.colors,
        data: props.data,
      }],
    }}
    options={{
      responsive: true,
      legend: {
        position: 'right',
        onClick: () => true,
      },
    }}
  />
);

DoughnutChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DoughnutChart;
