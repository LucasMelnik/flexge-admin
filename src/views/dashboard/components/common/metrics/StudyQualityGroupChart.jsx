import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../../../core/layout/Card';
import DoughnutChart from '../../../../../core/chart/DoughnutChart';
import { ORANGE, RED, GREEN, DARK_GREEN } from '../../../../../core/chart/colors';

const StudyQualityGroupChart = props => (
  <Card
    title="Students Study Quality Rates"
    loading={props.loading}
  >
    <DoughnutChart
      labels={[
        'Higher than 10',
        'Between 5 and 10',
        'Between 0 and 5',
        'Between 0 and -5',
      ]}
      data={props.data}
      colors={[DARK_GREEN, GREEN, ORANGE, RED]}
    />
  </Card>
);

StudyQualityGroupChart.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
  })).isRequired,
};

export default StudyQualityGroupChart;
