import React from 'react';
import PropTypes from 'prop-types';
import FetchSelect from '../../../core/form/FetchSelect';

const SchoolGradeConfigFilter = props => (
  <FetchSelect
    showSearch
    isPaginated
    label="Select the school"
    placeholder="Select the school to check the ranking"
    value={props.value}
    onChange={props.onChange}
    url={`schools${
      localStorage.role === 'DISTRIBUTOR_MANAGER'
        ? `?distributor=${localStorage.getItem('distributor')}`
        : localStorage.role === 'COMPANY_MANAGER'
        ? `?company=${localStorage.getItem('company')}`
        : ''
      }`}
    resultTransformer={{
      text: 'name',
      value: 'id',
    }}
  />
);

SchoolGradeConfigFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SchoolGradeConfigFilter;
