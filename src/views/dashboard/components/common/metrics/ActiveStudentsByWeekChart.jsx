import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../../../core/layout/Card';
import DoughnutChart from '../../../../../core/chart/DoughnutChart';
import { DARK_RED, DARK_GREEN, GREEN, ORANGE, RED } from '../../../../../core/chart/colors';
import Separator from '../../../../../core/layout/Separator';
import Table from '../../../../../core/form/Table';

const ActiveStudentsByWeekChart = props => (
  <Card
    title="Active Students By Period"
    loading={props.loading}
  >
    <DoughnutChart
      labels={[
        '% studied last 7 days',
        '% studied last 14 days',
        '% studied last 21 days',
        '% studied last 30 days',
        '% didn\'t study',
      ]}
      data={props.data}
      colors={[DARK_GREEN, GREEN, ORANGE, RED, DARK_RED]}
    />
    {props.showDetails && (
      <Separator size="md" />
    )}
    {props.showDetails && (
      <Table
        bordered={false}
        columns={[
          {
            label: 'Student',
            path: 'name',
          },
          {
            label: 'Class',
            path: 'schoolClass',
          },
        ]}
        rows={[
          { name: 'Juciel de Freitas', schoolClass: '3 A', studiedTime: '05:43' },
          { name: 'Vivian Daniela', schoolClass: '3 A', studiedTime: '05:12' },
          { name: 'Filipe Colpo', schoolClass: '3 A', studiedTime: '04:57' },
          { name: 'Rafael Arenas', schoolClass: '3 A', studiedTime: '04:24' },
          { name: 'Débora Vargas', schoolClass: '3 A', studiedTime: '04:13' },
        ]}
      />
    )}
  </Card>
);

ActiveStudentsByWeekChart.propTypes = {
  loading: PropTypes.bool.isRequired,
  showDetails: PropTypes.bool,
  data: PropTypes.array.isRequired,
};

ActiveStudentsByWeekChart.defaultProps = {
  showDetails: true,
};

export default ActiveStudentsByWeekChart;
