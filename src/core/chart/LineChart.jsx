import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import colors from './colors';

const hexToRgb = (hex, opacity) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ?
    `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${opacity})`
    : null;
};

const LineChart = props => (
  <Line
    height={100}
    data={{
      labels: props.labels,
      datasets: props.dataFormat.map((format, index) => ({
        label: format.label,
        backgroundColor: hexToRgb(colors[index], '0.3'),
        borderColor: colors[index],
        pointHoverRadius: 0,
        pointBorderWidth: 0,
        pointRadius: 0,
        data: props.data.map(item => format.valueRender(item)),
      })),
    }}
    options={{
      responsive: true,
      hover: {
        mode: 'nearest',
        intersect: true,
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      legend: {
        onClick: () => true,
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
