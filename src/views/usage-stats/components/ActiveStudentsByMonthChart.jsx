import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../core/layout/Card';
import BarChart from '../../../core/chart/BarChart';
import colors from '../../../core/chart/colors';

const ActiveStudentsByMonthChart = props => (
  <Card
    title="Active Students By Month"
    loading={props.loading}
  >
    <BarChart
      height={350}
      labels={props.data.map(d => d.id)}
      data={props.data}
      colors={colors}
      dataFormat={[
        {
          label: 'Total',
          valueRender: item => item.activeStudentsCount || 0,
        },
      ]}
    />
  </Card>
);

ActiveStudentsByMonthChart.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array,
};

ActiveStudentsByMonthChart.defaultProps = {
  data: [],
};

export default ActiveStudentsByMonthChart;
