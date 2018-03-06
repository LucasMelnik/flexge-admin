import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import range from 'lodash/range';
import get from 'lodash/get';
import Select from '../../../core/form/Select';

const MonthRankingFilter = props => (
  <Select
    value={get(props.values, 'month', '')}
    onChange={(month) => {
      props.onChange('month', month);
      props.onSearch();
    }}
    options={range(1, 13).map(month => moment(month, 'MM')).map(momentMonth => ({
      label: momentMonth.format('MMMM'),
      value: momentMonth.format('MM'),
    }))}
  />
);

MonthRankingFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default MonthRankingFilter;
