import React from 'react';
import PropTypes from 'prop-types';
import Select from '../../../../../core/form/Select';

const HistoryListFilter = props => (
  <Select
    placeholder="Select the year"
    value={props.year}
    onChange={value => props.onChange(value)}
    options={[
      { value: '2017', label: '2017' },
      { value: '2018', label: '2018' },
      { value: '2019', label: '2019' },
      { value: '2020', label: '2020' },
      { value: '2021', label: '2021' },
      { value: '2022', label: '2022' },
    ]}
  />
);

HistoryListFilter.propTypes = {
  year: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default HistoryListFilter;
