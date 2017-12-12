import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import colors from './colors';

const BarChart = props => (
  <Bar
    height={props.height}
    data={{
      labels: props.labels,
      datasets: props.dataFormat ? props.dataFormat.map((format, index) => ({
        backgroundColor: colors[index],
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
