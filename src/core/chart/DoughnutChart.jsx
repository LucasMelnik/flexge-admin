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
      tooltips: {
        callbacks: props.tooltipsCallbacks || {
          label: (tooltipItem, data) => {
            const rate = data.datasets[0].data[tooltipItem.index] || 0;
            return `${data.labels[tooltipItem.index]}: ${rate}%`;
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
