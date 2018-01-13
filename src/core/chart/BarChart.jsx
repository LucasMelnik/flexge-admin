import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import colors from './colors';

const hexToRgb = (hex, opacity) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ?
    `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${opacity})`
    : null;
};

const BarChart = props => (
  <Bar
    height={props.height}
    data={{
      labels: props.labels,
      datasets: props.dataFormat ? props.dataFormat.map((format, index) => ({
        backgroundColor: hexToRgb(colors[index], '0.3'),
        borderColor: colors[index],
        pointHoverRadius: 0,
        pointBorderWidth: 0,
        pointRadius: 0,
        borderWidth: 2,
        data: props.data.map(item => format.valueRender(item)),
        ...format,
      })) : [{
        fill: true,
        backgroundColor: props.colors,
        data: props.data,
      }],
    }}
    options={{
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
        onClick: () => true,
      },
      ...props.options,
    }}
  />
);

BarChart.propTypes = {
  height: PropTypes.number,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.array.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.object,
  dataFormat: PropTypes.array,
};

BarChart.defaultProps = {
  height: 200,
  options: {},
  dataFormat: null,
  colors: [],
};

export default BarChart;
