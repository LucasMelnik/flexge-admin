import React from 'react';
import PropTypes from 'prop-types';
import reverse from 'lodash/reverse';
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
        '% higher than 10',
        '% between 10 and 5',
        '% between 5 and 0',
        '% between 0 and -5',
      ]}
      data={reverse(props.data)}
      colors={[DARK_GREEN, GREEN, ORANGE, RED]}
    />
  </Card>
);

StudyQualityGroupChart.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default StudyQualityGroupChart;
