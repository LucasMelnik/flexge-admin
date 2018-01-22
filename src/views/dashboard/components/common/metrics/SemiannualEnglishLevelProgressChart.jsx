import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../../../core/layout/Card';
import BarChart from '../../../../../core/chart/BarChart';

const SemiannualEnglishLevelProgressChart = props => (
  <Card
    title={`Semiannual English Level Progress by
      ${localStorage.getItem('role') === 'SCHOOL_MANAGER' ? 'class' : 'school'}`}
    loading={props.loading}
  >
    <BarChart
      labels={props.data.map(item => item.name)}
      data={props.data.map(item => item.averageProgress)}
      options={{
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
              },
            },
          ],
        },
      }}
    />
  </Card>
);

SemiannualEnglishLevelProgressChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    schoolAverageProgress: PropTypes.number.isRequired,
  })),
  loading: PropTypes.bool.isRequired,
};

SemiannualEnglishLevelProgressChart.defaultProps = {
  data: [],
};

export default SemiannualEnglishLevelProgressChart;
