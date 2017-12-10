import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../../../core/layout/Card';
import Table from '../../../../../core/form/Table';
import DoughnutChart from '../../../../../core/chart/DoughnutChart';
import Separator from '../../../../../core/layout/Separator';
import { DARK_GREEN, GREEN, ORANGE, RED } from '../../../../../core/chart/colors';

const StudiedTimeChart = props => (
  <Card
    title="Studied time last 7 days"
    loading={props.loading}
  >
    <DoughnutChart
      labels={['More than 2h', 'Until 2h', 'Until 1h', 'Didn\'t study']}
      data={props.data}
      colors={[DARK_GREEN, GREEN, ORANGE, RED]}
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
          {
            label: 'Studied Time',
            path: 'studiedTime',
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

StudiedTimeChart.propTypes = {
  showDetails: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
};

StudiedTimeChart.defaultProps = {
  showDetails: true,
};

export default StudiedTimeChart;
