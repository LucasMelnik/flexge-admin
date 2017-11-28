import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

const LineChart = props => (
  <Line
    height={props.height}
    data={{
      labels: props.labels,
      datasets: props.dataFormat.map(format => ({
        label: format.label,
        fill: false,
        lineTension: 0,
        backgroundColor: format.color,
        borderColor: format.color,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: format.color,
        pointHoverBorderColor: format.color,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.data.map(item => format.valueRender(item)),
      })),
    }}
    options={{
      maintainAspectRatio: props.height ? false : true,
      legend: {
        display: false,
      },
      layout: {
        padding: {
          top: 30,
          bottom: 30,
        },
      },
      scales: {
        xAxes: [{
          display: false,
        }],
        yAxes: [{
          display: false,
        }],
      },
      tooltips: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        callbacks: {
          title: () => null,
          label: args => props.dataFormat[args.datasetIndex].tooltipRender(args),
        },
      },
    }}
  />
);

LineChart.propTypes = {
  height: PropTypes.number,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dataFormat: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    label: PropTypes.string,
    valueRender: PropTypes.func,
    tooltipRender: PropTypes.func,
  })).isRequired,
};

LineChart.defaultProps = {
  height: null,
};

export default LineChart;
