import React from 'react';
import PropTypes from 'prop-types';
import FetchSelect from '../../../core/form/FetchSelect';

const RankingListFilter = props => (
  <FetchSelect
    label="Select the school"
    placeholder="Select the school to check the ranking"
    value={props.value}
    onChange={props.onChange}
    url={`schools${localStorage.role === 'COMPANY_MANAGER' ? `?company=${JSON.parse(localStorage.getItem('company')).id}` : ''}`}
    resultTransformer={{
      text: 'name',
      value: 'id',
    }}
  />
);

RankingListFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RankingListFilter;
