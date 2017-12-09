import React from 'react';
import PropTypes from 'prop-types';
import reverse from 'lodash/reverse';
import Card from '../../../../../core/layout/Card';
import DoughnutChart from '../../../../../core/chart/DoughnutChart';
import { ORANGE, RED, GREEN, DARK_GREEN } from '../../../../../core/chart/colors';

const StudyQualityGroupChart = props => (
  <Card
    title="Percentual de Study Quality dos Alunos"
    loading={props.loading}
  >
    <DoughnutChart
      labels={['% de SQ entre -5 e 0', '% de SQ entre 0 a 5', '% de SQ entre 5 a 10', '% de SQ acima de 10']}
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
