import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

const BarChart = props => (
  <Bar
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
        display: false,
        onClick: () => true,
      },
      ...props.options,
    }}
  />
);

BarChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  options: PropTypes.shape({}),
};

BarChart.defaultProps = {
  options: {},
};

export default BarChart;
