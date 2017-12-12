import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';

const hexToRgb = (hex, opacity) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ?
    `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${opacity})`
    : null;
};

const DoughnutChart = props => (
  <Doughnut
    data={{
      labels: props.labels,
      datasets: [{
        fill: true,
        backgroundColor: props.colors.map(color => hexToRgb(color, 0.7)),
        data: props.data.map(data => data.rate),
      }],
    }}
    options={{
      responsive: true,
      legend: {
        position: 'right',
        onClick: () => true,
      },
      tooltips: {
        callbacks: props.tooltipsCallbacks || {
          label: (tooltipItem, data) => {
            const rate = data.datasets[0].data[tooltipItem.index] || 0;
            return `${data.labels[tooltipItem.index]}: ${rate}% (${props.data[tooltipItem.index].value} students)`;
          },
        },
      },
    }}
  />
);

DoughnutChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  tooltipsCallbacks: PropTypes.object,
};

DoughnutChart.defaultProps = {
  tooltipsCallbacks: null,
};

export default DoughnutChart;
