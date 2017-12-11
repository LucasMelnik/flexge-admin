import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../../../core/layout/Card';
import BarChart from '../../../../../core/chart/BarChart';
import { GREEN, ORANGE, RED, DARK_GREEN } from '../../../../../core/chart/colors';

const StudyQualityChart = props => (
  <Card
    title={props.title}
    loading={props.loading}
  >
    {!props.values || !props.values.length ? (
      <p>No School Class found.</p>
    ) : (
      <BarChart
        labels={props.labels}
        data={props.values}
        colors={props.values.map((item) => {
          if (item.value > 10) {
            return DARK_GREEN;
          } else if (item.value <= 10 && item.value > 5) {
            return GREEN;
          } else if (item.value <= 5 && item.value > 0) {
            return ORANGE;
          }
          return RED;
        })}
        options={{
          scales: {
            yAxes: [{
              display: true,
              ticks: {
                min: -5,
                max: 15,
                stepSize: 5,
              },
            }],
          },
        }}
      />
    )}
  </Card>
);

StudyQualityChart.propTypes = {
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default StudyQualityChart;
