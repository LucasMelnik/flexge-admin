import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Card from '../../../../../core/layout/Card';
import DoughnutChart from '../../../../../core/chart/DoughnutChart';
import Separator from '../../../../../core/layout/Separator';
import { DARK_GREEN, GREEN, ORANGE, YELLOW, RED, DARK_RED } from '../../../../../core/chart/colors';
import TopStudentsTableContainer from './TopStudentsTableContainer';

const StudiedTimeChart = props => (
  <Card
    title="Studied time last 7 days"
  >
    {!props.loading && props.data && (
      <div>
        <DoughnutChart
          labels={[
            'More than 2h',
            'Until 2h',
            'Until 1h 30m',
            'Until 1h',
            'Until 30m',
            'Didn\'t study',
          ]}
          data={props.data}
          colors={[DARK_GREEN, GREEN, ORANGE, YELLOW, RED, DARK_RED]}
        />
      </div>
    )}
    {props.showDetails && (
      <Separator size="md" />
    )}
    {props.showDetails && (
      <TopStudentsTableContainer
        query={props.query}
        days={7}
        from={moment().subtract(7, 'days').startOf('day').format('YYYY-MM-DD')}
        to={moment().endOf('day').format('YYYY-MM-DD')}
      />
    )}
  </Card>
);

StudiedTimeChart.propTypes = {
  showDetails: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
  })),
};

StudiedTimeChart.defaultProps = {
  showDetails: true,
  data: [],
};

export default StudiedTimeChart;
