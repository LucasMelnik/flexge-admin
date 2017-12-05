import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Select from '../../../../core/form/Select';

const HistoryListFilter = props => (
  <Select
    placeholder="Select the year"
    value={get(props.values, 'year', '')}
    onChange={value => props.onChange('year', value)}
    errorText={get(props.errors, 'year', '')}
    options={[
      { value: 2017, label: '2017' },
      { value: 2018, label: '2018' },
      { value: 2019, label: '2019' },
      { value: 2020, label: '2020' },
    ]}
  />
);

HistoryListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default HistoryListFilter;
